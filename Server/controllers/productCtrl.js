const Products = require('../models/productmodel');


//filter sorting pagination

class ApIfeatures{
    constructor(query,queryString){
      this.query=query;
      this.queryString=queryString

    }
    filtering(){
       const queryObj={...this.queryString}
    //    console.log(queryObj)
       const excludedFields=['page','sort','limit']
    excludedFields.forEach(el=>delete(queryObj[el]))
    //  console.log(queryObj)

     let queryStr=JSON.stringify(queryObj)
     queryStr=queryStr.replace(/\b(gte|gt|lt|lt|regex)b/g,match=>'$'+match)
    
    
    //  console.log({queryObj,queryStr})
     this.query.find(JSON.parse(queryStr))
    return this
    
    
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy=this.queryString.sort.split(',').join('')
          this.query = this.query.sort(sortBy)
            console.log(sortBy)
        }else{
            this.query=this.query.sort('createdat')
        }
       return this
    }
    pagination(){
     const page=this.queryString.page * 1 || 1;
     const limit=this.queryString.limit * 1 || 9
      const skip=(page-1)*limit
      this.query=this.query.skip(skip).limit(limit)
      return this
    }
}


const productCtrl = {
  // GET: Fetch all products
  getProduct: async (req, res) => {
    try {
        console.log(req.query)
        const features=new ApIfeatures(Products.find(),req.query).filtering().sorting().pagination()
      const products = await features.query;
        res.json({status:'success',
            result: products.length,
        products:products})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // POST: Create new product
  createProducts: async (req, res) => {
    try {
      const { product_id, title, price, description, content, images, category } = req.body;

      if (!images) return res.status(400).json({ msg: "No image uploaded" });

      const existingProduct = await Products.findOne({ product_id });
      if (existingProduct)
        return res.status(400).json({ msg: "This product already exists" });

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });

      await newProduct.save();
      res.json({ msg: "Created a product" });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // DELETE: Delete a product by ID
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // PUT: Update a product by ID
  updateProduct: async (req, res) => {
    try {
      const { title, price, description, content, images, category } = req.body;

      if (!images) return res.status(400).json({ msg: "No image uploaded" });

      await Products.findByIdAndUpdate(req.params.id, {
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });

      res.json({ msg: "Updated a product" });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = productCtrl;
