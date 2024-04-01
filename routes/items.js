
const express = require ('express');
const router = express.Router();
const Item = require('../models/item')

router.get('/',async(req,res)=>{
   try{
        const items =await Item.find()
        res.json(items)

   }catch(err){
    res.send('Error' + err)
   }
    
})

router.get("/:id", async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      res.json(item); // Corrected variable name from items to item
    } catch (err) {
      res.send("err" + err);
    }
  });

router.post('/',async(req,res)=>{
  
         const item =new Item({
            itemName: req.body.itemName,
            itemDiscription: req.body.itemDiscription,
            itemType: req.body.itemType
           
         })
         try {
            const savedItem = await item.save(); // Corrected method name
            res.json(savedItem);
        } catch (err) {
            res.status(500).send('Error: ' + err);
        }
    });

    router.patch("/:id", async (req, res) => {
        try {
          const item = await Item.findById(req.params.id);
          item.itemName = req.body.sub;
          const a1 = await item.save();
          res.json(a1);
        } catch (err) {
          res.send("Error");
        }
      });

      router.delete("/:id", async (req, res) => {
        try {
          const deletedItem = await Item.findByIdAndDelete(req.params.id);
          res.json(deletedItem); // Respond with the deleted item document
        } catch (err) {
          res.status(500).send("Error: " + err);
        }
      });
      

module.exports = router;
