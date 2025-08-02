const express = require('express');
const { Project, MapFeature, Simulation, ComplianceCheck, User } = require('../models');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Get all projects for user
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { userId: req.user.userId },
      include: [
        {
          model: MapFeature,
          as: 'features'
        },
        {
          model: User,
          as: 'user',
          attributes: ['firstName', 'lastName', 'email']
        }
      ],
      order: [['updatedAt', 'DESC']]
    });

    res.json({ projects });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single project
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.userId 
      },
      include: [
        {
          model: MapFeature,
          as: 'features'
        },
        {
          model: Simulation,
          as: 'simulations'
        },
        {
          model: ComplianceCheck,
          as: 'complianceChecks'
        }
      ]
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ project });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create project
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      description,
      location,
      riskLevel,
      teamSize,
      budget,
      startDate,
      endDate,
      mapCenter
    } = req.body;

    const projectData = {
      name,
      description,
      location,
      riskLevel: riskLevel || 'medium',
      teamSize: parseInt(teamSize) || 1,
      budget: budget ? parseFloat(budget) : null,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      mapCenter: mapCenter ? JSON.parse(mapCenter) : { lat: 19.0760, lng: 72.8777, zoom: 12 },
      userId: req.user.userId,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    };

    const project = await Project.create(projectData);

    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update project
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const project = await Project.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.userId 
      }
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    await project.update(updateData);

    res.json({
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.userId 
      }
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.destroy();

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get project statistics
router.get('/:id/stats', auth, async (req, res) => {
  try {
    const project = await Project.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.userId 
      },
      include: [
        {
          model: MapFeature,
          as: 'features'
        },
        {
          model: Simulation,
          as: 'simulations'
        },
        {
          model: ComplianceCheck,
          as: 'complianceChecks'
        }
      ]
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const stats = {
      totalFeatures: project.features.length,
      featuresByCategory: {
        infrastructure: project.features.filter(f => f.category === 'infrastructure').length,
        disaster: project.features.filter(f => f.category === 'disaster').length,
        eco: project.features.filter(f => f.category === 'eco').length,
        transportation: project.features.filter(f => f.category === 'transportation').length
      },
      totalSimulations: project.simulations.length,
      completedSimulations: project.simulations.filter(s => s.status === 'completed').length,
      complianceChecks: project.complianceChecks.length,
      averageResilienceScore: project.resilienceScore,
      averageEcoScore: project.ecoScore,
      averageComplianceScore: project.complianceScore
    };

    res.json({ stats });
  } catch (error) {
    console.error('Get project stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;