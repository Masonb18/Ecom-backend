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
router.post('/', (req, res)=> {
  req.body = {
    category_name: req.body.category_name,
  }
  try {
    const categoryData = Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err){
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.post('/', async (req, res) => {
  try {
    const cateogryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  try{
    const categoryData = Category.destory({
      where: {
        id: categoryId
      },
    })
 if (!categoryData) {
  res.status(400).json({message: 'No category with this id'});
  return;
 }
 res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
