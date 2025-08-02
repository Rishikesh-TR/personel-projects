const express = require('express');
const { ComplianceCheck, Project } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Get compliance checks for a project
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

    const complianceChecks = await ComplianceCheck.findAll({
      where: { projectId: req.params.projectId },
      order: [['runDate', 'DESC']]
    });

    res.json({ complianceChecks });
  } catch (error) {
    console.error('Get compliance checks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Run compliance check
router.post('/', auth, async (req, res) => {
  try {
    const { standard, projectId } = req.body;

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

    const standardNames = {
      'is1893': 'IS 1893:2016 Earthquake Code',
      'nbc2016': 'NBC 2016 National Building Code',
      'ircsp55': 'IRC:SP:55 Road Guidelines',
      'is11799': 'IS 11799 Flood Protection',
      'cpcb': 'CPCB Environmental Standards'
    };

    const complianceCheck = await ComplianceCheck.create({
      standard,
      standardName: standardNames[standard],
      overallScore: 0,
      checks: [],
      projectId,
      status: 'pending'
    });

    // Simulate running compliance check
    setTimeout(async () => {
      try {
        const results = await runComplianceCheck(standard, project);
        await complianceCheck.update({
          status: 'completed',
          overallScore: results.overallScore,
          checks: results.checks,
          recommendations: results.recommendations
        });

        // Update project compliance score
        await project.update({
          complianceScore: results.overallScore
        });
      } catch (error) {
        await complianceCheck.update({ status: 'failed' });
      }
    }, 1500);

    res.status(201).json({
      message: 'Compliance check started successfully',
      complianceCheck
    });
  } catch (error) {
    console.error('Create compliance check error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get compliance check details
router.get('/:id', auth, async (req, res) => {
  try {
    const complianceCheck = await ComplianceCheck.findOne({
      where: { id: req.params.id },
      include: [{
        model: Project,
        as: 'project',
        where: { userId: req.user.userId }
      }]
    });

    if (!complianceCheck) {
      return res.status(404).json({ message: 'Compliance check not found' });
    }

    res.json({ complianceCheck });
  } catch (error) {
    console.error('Get compliance check error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Compliance check logic
async function runComplianceCheck(standard, project) {
  const checks = [];
  let totalScore = 0;
  let checkCount = 0;

  switch (standard) {
    case 'is1893':
      // Earthquake resistance checks
      const earthquakeChecks = [
        {
          id: 'seismic-zone',
          title: 'Building Seismic Zone Categorization',
          description: 'Buildings are correctly categorized for seismic zone',
          status: 'passed',
          score: 100,
          elements: []
        },
        {
          id: 'structural-system',
          title: 'Structural System Requirements',
          description: 'Structures meet ductile detailing requirements',
          status: 'passed',
          score: 95,
          elements: []
        },
        {
          id: 'foundation-design',
          title: 'Foundation Design',
          description: 'Some foundational elements need additional reinforcement',
          status: 'warning',
          score: 75,
          elements: ['Northern Metro Station', 'Commercial Complex B12']
        },
        {
          id: 'building-separation',
          title: 'Building Separation Requirements',
          description: 'Insufficient gap between adjacent tall structures',
          status: 'failed',
          score: 45,
          elements: ['Residential Towers R7-R9', 'Office Complex East']
        },
        {
          id: 'irregularity-controls',
          title: 'Structural Irregularity Controls',
          description: 'Vertical irregularities detected in some buildings',
          status: 'warning',
          score: 70,
          elements: ['Tech Park Building A', 'Hospital Tower']
        }
      ];
      
      checks.push(...earthquakeChecks);
      totalScore = earthquakeChecks.reduce((sum, check) => sum + check.score, 0);
      checkCount = earthquakeChecks.length;
      break;

    case 'nbc2016':
      // National Building Code checks
      const nbcChecks = [
        {
          id: 'fire-safety',
          title: 'Fire Safety Requirements',
          description: 'Fire safety systems meet NBC standards',
          status: 'passed',
          score: 90,
          elements: []
        },
        {
          id: 'accessibility',
          title: 'Accessibility Standards',
          description: 'Buildings comply with accessibility requirements',
          status: 'warning',
          score: 80,
          elements: ['Shopping Complex A', 'Office Building C']
        }
      ];
      
      checks.push(...nbcChecks);
      totalScore = nbcChecks.reduce((sum, check) => sum + check.score, 0);
      checkCount = nbcChecks.length;
      break;

    default:
      // Default checks
      checks.push({
        id: 'general-compliance',
        title: 'General Compliance',
        description: 'Basic compliance requirements met',
        status: 'passed',
        score: 85,
        elements: []
      });
      totalScore = 85;
      checkCount = 1;
  }

  const overallScore = Math.round(totalScore / checkCount);

  const recommendations = generateComplianceRecommendations(standard, checks);

  return {
    overallScore,
    checks,
    recommendations
  };
}

function generateComplianceRecommendations(standard, checks) {
  const recommendations = [];

  checks.forEach(check => {
    if (check.status === 'failed') {
      recommendations.push({
        id: `rec-${check.id}`,
        text: `Address critical issues in ${check.title}`,
        priority: 'high',
        relatedCheck: check.id,
        estimatedCost: 5000000
      });
    } else if (check.status === 'warning') {
      recommendations.push({
        id: `rec-${check.id}`,
        text: `Improve ${check.title} to meet full compliance`,
        priority: 'medium',
        relatedCheck: check.id,
        estimatedCost: 2000000
      });
    }
  });

  return recommendations;
}

module.exports = router;