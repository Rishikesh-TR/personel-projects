const express = require('express');
const { MapFeature, Project } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Get map features for a project
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

    const features = await MapFeature.findAll({
      where: { projectId: req.params.projectId },
      order: [['createdAt', 'DESC']]
    });

    res.json({ features });
  } catch (error) {
    console.error('Get map features error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create map feature
router.post('/', auth, async (req, res) => {
  try {
    const {
      name,
      type,
      category,
      status,
      geometry,
      properties,
      resilienceScore,
      cost,
      priority,
      projectId
    } = req.body;

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

    const feature = await MapFeature.create({
      name,
      type,
      category,
      status: status || 'proposed',
      geometry,
      properties: properties || {},
      resilienceScore: resilienceScore || 0,
      cost: cost ? parseFloat(cost) : null,
      priority: priority || 'medium',
      projectId,
      createdBy: `${req.user.firstName} ${req.user.lastName}`
    });

    res.status(201).json({
      message: 'Map feature created successfully',
      feature
    });
  } catch (error) {
    console.error('Create map feature error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update map feature
router.put('/:id', auth, async (req, res) => {
  try {
    const feature = await MapFeature.findOne({
      where: { id: req.params.id },
      include: [{
        model: Project,
        as: 'project',
        where: { userId: req.user.userId }
      }]
    });

    if (!feature) {
      return res.status(404).json({ message: 'Map feature not found' });
    }

    await feature.update(req.body);

    res.json({
      message: 'Map feature updated successfully',
      feature
    });
  } catch (error) {
    console.error('Update map feature error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete map feature
router.delete('/:id', auth, async (req, res) => {
  try {
    const feature = await MapFeature.findOne({
      where: { id: req.params.id },
      include: [{
        model: Project,
        as: 'project',
        where: { userId: req.user.userId }
      }]
    });

    if (!feature) {
      return res.status(404).json({ message: 'Map feature not found' });
    }

    await feature.destroy();

    res.json({ message: 'Map feature deleted successfully' });
  } catch (error) {
    console.error('Delete map feature error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get feature statistics
router.get('/stats/:projectId', auth, async (req, res) => {
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

    const features = await MapFeature.findAll({
      where: { projectId: req.params.projectId }
    });

    const stats = {
      total: features.length,
      byCategory: {
        infrastructure: features.filter(f => f.category === 'infrastructure').length,
        disaster: features.filter(f => f.category === 'disaster').length,
        eco: features.filter(f => f.category === 'eco').length,
        transportation: features.filter(f => f.category === 'transportation').length,
        residential: features.filter(f => f.category === 'residential').length,
        commercial: features.filter(f => f.category === 'commercial').length
      },
      byStatus: {
        existing: features.filter(f => f.status === 'existing').length,
        proposed: features.filter(f => f.status === 'proposed').length,
        under_construction: features.filter(f => f.status === 'under_construction').length,
        completed: features.filter(f => f.status === 'completed').length
      },
      averageResilienceScore: features.length > 0 
        ? Math.round(features.reduce((sum, f) => sum + f.resilienceScore, 0) / features.length)
        : 0,
      totalCost: features.reduce((sum, f) => sum + (parseFloat(f.cost) || 0), 0)
    };

    res.json({ stats });
  } catch (error) {
    console.error('Get feature stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;