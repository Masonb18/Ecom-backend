const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', (req, res) => {
  Tag.findAll({
    include: {
      model: Product,
      model: ProductTag
    },
   })
    .then((categories)=> {
      res.json(categories);
    })
    .catch((err)=> {
      console.error('Error retrieiving tags', err);
      res.status(500).json({ error: 'Failen to retrieve tags'});
    })
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', (req, res) => {
  const tagId = req.params.id;
  Category.findByPk(tagId, {
    include: {
      model: Product,
      model: ProductTag
    },
  })
  .then((category)=> {
    if (!category) {
      res.status(404).json({ error: 'Tag not found' });
    } else {
      res.json(category);
    }
  })
  .catch((err) => {
    console.error('Error retriving the tag', err);
    res.status(500).json({ error: 'Failed to retrieve tag'});
  })
});

// create a new tag
router.post('/', (req, res) => {
    const { tag_name }= req.body;
    Tag.create({ tag_name })
    .then((tag)=> {
      res.json(tag);
    })
    .catch((err) => {
      console.error('Error creating new tag:', err);
      res.status(500).json({ error: 'Failed to create tag'});
    })
});


// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const tagData = Tag.destroy({
      where: { id: req.params.id }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tags with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
