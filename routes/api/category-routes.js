const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
 Category.findAll({
  include: {
    model: Product,
  },
 })
  .then((categories)=> {
    res.json(categories);
  })
  .catch((err)=> {
    console.error('Error retrieiving categories', err);
    res.status(500).json({ error: 'Failen to retrieve categories'});
  })
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', (req, res) => {
  const categoryId = req.params.id;
  Category.findByPk(categoryId, {
    include: {
      model: Product,
    },
  })
  .then((category)=> {
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.json(category);
    }
  })
  .catch((err) => {
    console.error('Error retriving the category', err);
    res.status(500).json({ error: 'Failed to retrieve category'});
  })
});

// create a new category
router.post('/', (req, res) => {
  const { category_name }= req.body;
  Category.create({ category_name })
  .then((category)=> {
    res.json(category);
  })
  .catch((err) => {
    console.error('Error creating category:', err);
    res.status(500).json({ error: 'Failed to create category'});
  })
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  const categoryId = req.params.id;
  const { category_name }= req.body;

  Category.update({ category_name }, {
    where: {
      id: categoryId;
    }
  })
  .then((rowsUpdated)=> {
    if (rowsUpdated[0]=== 0) {
      res.status(404).json({error: 'Category not found' });
    }else {
      res.json({ message: 'Category updated successfully' });
    }
  })
  .catch((err) => {
    console.error('Error retriving the category', err);
    res.status(500).json({ error: 'Failed to retrieve category'});
  })
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  const categoryId = req.params.id;

  Category.destory({
    where: {
      id: categoryId
    },
  })
  .then ((rowsDeleted)=> {
    if (rowsDeleted === 0) {
      res.status(404).json({ error: 'Failed to delete category'});
    }
  })
  .catch((err) => {
    console.error('Error deleteing category:', err);
    res.status(500).json({ error: 'Failed to delete category' });
  });
});

module.exports = router;
