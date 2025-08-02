const express = require('express');
const { Simulation, Project } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Get simulations for a project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const project = await Project.findOne({
      where: { 
        id: req.params.projectId,
        userId: req.user.userId 
      }
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const simulations = await Simulation.findAll({
      where: { projectId: req.params.projectId },
      order: [['createdAt', 'DESC']]
    });

    res.json({ simulations });
  } catch (error) {
    console.error('Get simulations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create simulation
router.post('/', auth, async (req, res) => {
  try {
    const { name, type, parameters, projectId } = req.body;

    // Verify project ownership
    const project = await Project.findOne({
      where: { 
        id: projectId,
        userId: req.user.userId 
      }
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const simulation = await Simulation.create({
      name,
      type,
      parameters,
      projectId,
      status: 'pending'
    });

    // Simulate running the simulation (in real app, this would be async)
    setTimeout(async () => {
      try {
        const results = await runSimulation(type, parameters);
        await simulation.update({
          status: 'completed',
          results,
          duration: Math.floor(Math.random() * 30) + 10, // 10-40 seconds
          riskAreas: generateRiskAreas(type, parameters),
          recommendations: generateRecommendations(type, results),
          impactSummary: generateImpactSummary(type, results)
        });
      } catch (error) {
        await simulation.update({ status: 'failed' });
      }
    }, 2000);

    res.status(201).json({
      message: 'Simulation started successfully',
      simulation
    });
  } catch (error) {
    console.error('Create simulation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get simulation results
router.get('/:id', auth, async (req, res) => {
  try {
    const simulation = await Simulation.findOne({
      where: { id: req.params.id },
      include: [{
        model: Project,
        as: 'project',
        where: { userId: req.user.userId }
      }]
    });

    if (!simulation) {
      return res.status(404).json({ message: 'Simulation not found' });
    }

    res.json({ simulation });
  } catch (error) {
    console.error('Get simulation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete simulation
router.delete('/:id', auth, async (req, res) => {
  try {
    const simulation = await Simulation.findOne({
      where: { id: req.params.id },
      include: [{
        model: Project,
        as: 'project',
        where: { userId: req.user.userId }
      }]
    });

    if (!simulation) {
      return res.status(404).json({ message: 'Simulation not found' });
    }

    await simulation.destroy();

    res.json({ message: 'Simulation deleted successfully' });
  } catch (error) {
    console.error('Delete simulation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Simulation logic functions
async function runSimulation(type, parameters) {
  // Mock simulation results based on type
  const baseResults = {
    totalArea: 1000000, // sq meters
    affectedArea: 0,
    buildingsAnalyzed: 150,
    buildingsAffected: 0,
    infrastructureAffected: 0,
    estimatedDamage: 0,
    casualties: 0
  };

  switch (type) {
    case 'earthquake':
      const magnitude = parameters.magnitude || 7.0;
      const affectedPercentage = Math.min((magnitude - 5) * 20, 80);
      return {
        ...baseResults,
        magnitude,
        affectedArea: Math.floor(baseResults.totalArea * (affectedPercentage / 100)),
        buildingsAffected: Math.floor(baseResults.buildingsAnalyzed * (affectedPercentage / 100)),
        infrastructureAffected: Math.floor(25 * (affectedPercentage / 100)),
        estimatedDamage: Math.floor(magnitude * 50000000), // in rupees
        casualties: Math.floor(magnitude * 100)
      };

    case 'flood':
      const depth = parameters.depth || 2.0;
      const floodAffected = Math.min(depth * 25, 75);
      return {
        ...baseResults,
        depth,
        affectedArea: Math.floor(baseResults.totalArea * (floodAffected / 100)),
        buildingsAffected: Math.floor(baseResults.buildingsAnalyzed * (floodAffected / 100)),
        infrastructureAffected: Math.floor(30 * (floodAffected / 100)),
        estimatedDamage: Math.floor(depth * 30000000),
        casualties: Math.floor(depth * 50)
      };

    default:
      return baseResults;
  }
}

function generateRiskAreas(type, parameters) {
  // Generate mock risk areas based on simulation type
  return [
    {
      id: 'risk-1',
      name: 'Central Business District',
      riskLevel: 'high',
      coordinates: [[72.8577, 19.0560], [72.8977, 19.0560], [72.8977, 19.0960], [72.8577, 19.0960]]
    },
    {
      id: 'risk-2',
      name: 'Residential Area North',
      riskLevel: 'medium',
      coordinates: [[72.8377, 19.0760], [72.8777, 19.0760], [72.8777, 19.1160], [72.8377, 19.1160]]
    }
  ];
}

function generateRecommendations(type, results) {
  const recommendations = [];

  if (type === 'earthquake') {
    recommendations.push(
      {
        id: 'eq-1',
        text: 'Upgrade buildings in high-risk zones to IS 1893 standards',
        priority: 'high',
        category: 'infrastructure',
        estimatedCost: 50000000
      },
      {
        id: 'eq-2',
        text: 'Install seismic sensors across critical infrastructure',
        priority: 'medium',
        category: 'technology',
        estimatedCost: 10000000
      }
    );
  }

  if (type === 'flood') {
    recommendations.push(
      {
        id: 'fl-1',
        text: 'Construct flood barriers along vulnerable coastlines',
        priority: 'high',
        category: 'infrastructure',
        estimatedCost: 75000000
      },
      {
        id: 'fl-2',
        text: 'Improve drainage systems in low-lying areas',
        priority: 'high',
        category: 'infrastructure',
        estimatedCost: 25000000
      }
    );
  }

  return recommendations;
}

function generateImpactSummary(type, results) {
  return {
    severity: results.buildingsAffected > 100 ? 'severe' : results.buildingsAffected > 50 ? 'moderate' : 'low',
    economicImpact: results.estimatedDamage,
    socialImpact: results.casualties,
    environmentalImpact: Math.floor(results.affectedArea / 10000), // hectares of green space affected
    recoveryTime: Math.ceil(results.buildingsAffected / 10) // weeks
  };
}

module.exports = router;