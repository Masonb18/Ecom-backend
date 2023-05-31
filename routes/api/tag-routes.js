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

router.put('/:id', (req, res) => {
  const tagID = req.params.id;
  const { tag_name } = req.body;

  Tag.update({ tag_name }, {
    where: {
      id: tagID
    }
  })
  .then((rowsUpdated)=> {
    if (rowsUpdated[0]=== 0) {
      res.status(404).json({error: 'Tag not found' });
    }else {
      res.json({ message: 'Tag updated successfully' });
    }
  })
  .catch((err) => {
    console.error('Error retriving the tag', err);
    res.status(500).json({ error: 'Failed to retrieve tag'});
  })
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  const tagId = req.params.id;

  Category.destory({
    where: {
      id: tagId
    },
  })
  .then ((rowsDeleted)=> {
    if (rowsDeleted === 0) {
      res.status(404).json({ error: 'Failed to delete category'});
    }
  })
  .catch((err) => {
    console.error('Error deleteing tag:', err);
    res.status(500).json({ error: 'Failed to delete tag' });
  });
});

module.exports = router;
