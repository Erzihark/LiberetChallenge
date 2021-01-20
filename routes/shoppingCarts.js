import express from 'express';
//random id generator
import { v4 as uuidv4 } from 'uuid'; 

//--------------------------------------- Variables ---------------------------------------------

const router = express.Router();

var carts = [];
var usersID = [];
var addedProducts = [];

var cheeseID = "001";
var cheeseNumber;
var globalCheeseCounter = 0;
var firstCheese = true;
var cheeseOrder = [];

var eggsID = "002";
var eggsNumber;
var eggsCounter = 0;
var firstEggs = true;
var eggsOrder = [];

var milkID = "003";
var milkNumber;
var milkCounter = 0;
var firstMilk = true;
var milkOrder = [];


var totalCounter = 0;
var deliveryCounter = 0;

var userNumber = 0;
var orderNumber = 0;
var orderRef;
var productNumber = 0;
var cartActive = false;

var productIds = {
    "001" : { name: "cheese", price: 50, firstCheese:false, productNumber:0, cheeseNumber:0 },
    "002" : { name: "eggs", price: 2, firstEggs:false, productNumber:0, eggsNumber:0  },
    "003" : { name: "milk", price: 2000, firstMilk:false, productNumber:0, milkNumber:0  }
}


var shoppingCart = 
{
    orders:
    [
        {
        orderID: String,
        products:
        [],    
        orderCost: Number,
        orderDeliveryFee: Number
        }
    ],
    totalDeliveryFee: Number,
    totalOrdersCost: Number,
    totalCost: Number
};

var orderReferences = [];

//----------------------------------------------- Get cart ------------------------------------------------

router.get('/:userNumber/add', (req, res) => {
    
    userNumber = req.params;

    res.send(shoppingCart);
    console.log(shoppingCart);
});

        //---------------------------------------Add cheese--------------

router.post(`/${userNumber}/add/cheese`, (req, res) => {

    const itemArray = req.body;

    const cheeseInfo = {...itemArray, id: cheeseID, price:productIds["001"].price};
    addedProducts.push(cheeseInfo);

    //array that keeps values that determine if an order is unique
    orderReferences.push({date:itemArray.serviceDate, schedule:itemArray.serviceSchedule,
        supplier:itemArray.supplier, delivery:itemArray.deliveryType, orderID:orderNumber})

    if (orderReferences[orderNumber].delivery == "DELIVERY")
    {

        const date = new Date(orderReferences[orderNumber].date); 
        const deliverySchedule = new Date(orderReferences[orderNumber].schedule);

        if (deliverySchedule - date > 1440000) //4hrs in milliseconds
        {
          //scheduled order
          deliveryCounter =  19;
        }
        else
        //express order
        deliveryCounter = 28;
    }
        
        for (let i = 0; i < orderReferences.length; i++)
        {
            //looks for order identical to the one just submitted
            if (orderReferences[orderReferences.length - 1].delivery === orderReferences[i].delivery
                && orderReferences[orderReferences.length - 1].date === orderReferences[i].date
                && orderReferences[orderReferences.length - 1].schedule === orderReferences[i].schedule
                && orderReferences[orderReferences.length - 1].supplier === orderReferences[i].supplier) 
            {
                // assigns order id of the matched order to the one submitted (so that the following
                // insertions are made on the index that contains such id)
                orderReferences[orderReferences.length - 1].orderID = orderReferences[i].orderID;
                orderRef = orderReferences[i].orderID;
                console.log("Order with number " , orderRef , " found");

                { break; }
            }
            //if order properties were unique, then creates a new order
            else if (i == orderReferences.length - 2) {
     
             orderNumber ++;
             orderReferences[orderReferences.length - 1].orderID = orderNumber;
             firstCheese = true;
             console.log("New order created with number" + orderNumber);
             shoppingCart.orders.push({
                orderID: orderNumber,
                products:
                [],    
                orderCost: Number,
                orderDeliveryFee: Number
                })
                { break; }
            }  
        }
        console.log(orderReferences);

        globalCheeseCounter += itemArray.Amount;
    

    totalCounter = (globalCheeseCounter * productIds["001"].price) + (milkCounter * productIds["003"].price)
     + (eggsCounter * productIds["002"].price);

    addCheese();

    res.send(`Item with id ${cheeseID} added to the order!`);
    //console.log(itemArray.Amount * 50);
    
});

        //---------------------------------------Add eggs---------------

router.post(`/${userNumber}/add/eggs`, (req, res) => {

    //userNumber = req.params;

    const itemArray = req.body;

    //adds a property 'userIdNumber' to the 'userId' object
    const eggsInfo = {...itemArray, id: eggsID, price:productIds["002"].price};
    addedProducts.push(eggsInfo);



    orderReferences.push({date:itemArray.serviceDate, schedule:itemArray.serviceSchedule,
        supplier:itemArray.supplier, delivery:itemArray.deliveryType, orderID:orderNumber})

    if (orderReferences.delivery == "DELIVERY")
    {
        const date = new Date(orderReferences[orderNumber].date); 
        const deliverySchedule = new Date(orderReferences[orderNumber].schedule);

        if (deliverySchedule - date > 1440000) //4hrs in milliseconds
        {
          //scheduled order
          deliveryCounter =  19;
        }
        else
        //express order
        deliveryCounter = 28;   
    }
        
        for (let i = 0; i < orderReferences.length; i++)
        {
            if (orderReferences[orderReferences.length - 1].delivery === orderReferences[i].delivery
                && orderReferences[orderReferences.length - 1].date === orderReferences[i].date
                && orderReferences[orderReferences.length - 1].schedule === orderReferences[i].schedule
                && orderReferences[orderReferences.length - 1].supplier === orderReferences[i].supplier) 
            {
                orderReferences[orderReferences.length - 1].orderID = orderReferences[i].orderID;
                orderRef = orderReferences[i].orderID;
                console.log("Order with number " , orderNumber , " found");

                { break; }
            }
            else if (i == orderReferences.length - 2) {
     
             orderNumber ++;
             orderReferences[orderReferences.length - 1].orderID = orderNumber;
             firstEggs = true;
             console.log("New order created with number" + orderNumber);
             shoppingCart.orders.push({
                orderID: orderNumber,
                products:
                [],    
                orderCost: Number,
                orderDeliveryFee: Number
                })
                { break; }
            }  
        }
        console.log(orderReferences);

        eggsCounter += itemArray.Amount;
    

    totalCounter = (globalCheeseCounter * productIds["001"].price) + (milkCounter * productIds["003"].price)
     + (eggsCounter * productIds["002"].price);

    addEggs();

    res.send(`Item with id ${eggsID} added to the database!`);
    console.log(addedProducts);
    
});

        //---------------------------------------Add milk---------------

        router.post(`/${userNumber}/add/milk`, (req, res) => {
        
            const itemArray = req.body;
        
            //adds a property 'userIdNumber' to the 'userId' object
            const milkInfo = {...itemArray, id: milkID, price:productIds["003"].price};
            addedProducts.push(milkInfo);
        
            orderReferences.push({date:itemArray.serviceDate, schedule:itemArray.serviceSchedule,
                supplier:itemArray.supplier, delivery:itemArray.deliveryType, orderID:orderNumber})
        
            if (orderReferences.delivery == "DELIVERY")
            {
                const date = new Date(orderReferences[orderNumber].date); 
                const deliverySchedule = new Date(orderReferences[orderNumber].schedule);
        
                if (deliverySchedule - date > 1440000) //4hrs in milliseconds
                {
                  //scheduled order
                  deliveryCounter =  19;
                }
                else
                //express order
                deliveryCounter = 28;   
            }
                
                for (let i = 0; i < orderReferences.length; i++)
                {
                    if (orderReferences[orderReferences.length - 1].delivery === orderReferences[i].delivery
                        && orderReferences[orderReferences.length - 1].date === orderReferences[i].date
                        && orderReferences[orderReferences.length - 1].schedule === orderReferences[i].schedule
                        && orderReferences[orderReferences.length - 1].supplier === orderReferences[i].supplier) 
                    {
                        orderReferences[orderReferences.length - 1].orderID = orderReferences[i].orderID;
                        orderRef = orderReferences[i].orderID;
                        console.log("Order with number " , orderNumber , " found");
        
                        { break; }
                    }
                    else if (i == orderReferences.length - 2) {
             
                     orderNumber ++;
                     orderReferences[orderReferences.length - 1].orderID = orderNumber;
                     firstMilk = true;
                     console.log("New order created with number" + orderNumber);
                     shoppingCart.orders.push({
                        orderID: orderNumber,
                        products:
                        [],    
                        orderCost: Number,
                        orderDeliveryFee: Number
                        })
                        { break; }
                    }  
                }
                console.log(orderReferences);
        
                milkCounter += itemArray.Amount;
            
        
            totalCounter = (globalCheeseCounter * productIds["001"].price) + (milkCounter * productIds["003"].price)
             + (eggsCounter * productIds["002"].price);
        
            addMilk();
        
            res.send(`Item with id ${milkID} added to the database!`);
            
            
        });



//---------------------------------------------- Delete item -------------------------------------

router.delete(`/${userNumber}/remove/cheese`, (req, res) => {

    const { id, userNumber } = req.params;

    if (cartActive = false)
        res.send('Cannot delete items on an empty cart')
    
    else
    //filters all carts so that only the one that is removed is the currently selected one                                        
    shoppingCart.orders[orderNumber].products = shoppingCart.orders[orderNumber].products.filter((itemToDelete) => itemToDelete.id !== id); 
    res.send(`Item with the id ${id} deleted from the database`)
})

router.patch('/:userNumber/remove/:id/', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age} = req.body;

    const updatecart = carts.find((user) => user.id == id);

    if(firstName){
        user.firstName = firstName;
    }
    if(lastName){
        user.lastName = firstName;
    }
    if(age){
        user.age = firstName;
    }

    res.send(`user with the id ${id} has been updated`);


})

//--------------------------------- Functions -------------------------------------

function addCheese() {

    if (cartActive == false) {
        
        cartActive = true;
        userNumber ++;
        shoppingCart.orders[orderNumber].orderID = orderNumber;
    }
    
    if (firstCheese == false) {

        console.log(orderRef);
        console.log("Indice de arreglo " , shoppingCart.orders[orderRef]);
        console.log(shoppingCart.orders[orderRef].products/*[cheeseNumber]*/);
        cheeseOrder[orderRef].cheeseCounter += globalCheeseCounter;
        shoppingCart.orders[orderRef].products[cheeseOrder[orderNumber].cheeseNumber].amount = cheeseOrder[orderRef].cheeseCounter;
        
    } 

    else {

        console.log("Order number " , orderNumber);
        cheeseOrder.push({cheeseNumber:0, productNumber:0, cheeseCounter:0})
        cheeseOrder[orderNumber].cheeseNumber = cheeseOrder[orderNumber].productNumber;
        //console.log(cheeseOrder);
        shoppingCart.orders[orderNumber].products.push({productId:cheeseID, amount:globalCheeseCounter, price:productIds["001"].price});
        cheeseOrder[orderNumber].productNumber ++;
        firstCheese = false;
        console.log("First order of cheese added to order # ", orderNumber);

    } 

    shoppingCart.totalCost = totalCounter + deliveryCounter;
    shoppingCart.totalOrdersCost = totalCounter;
    shoppingCart.totalDeliveryFee = deliveryCounter;

}

function addEggs() {

    if (cartActive == false)
    {
        cartActive = true;
        userNumber ++;
        shoppingCart.orders[orderNumber].orderID = orderNumber;
    }

    if (firstEggs == false) {

        eggsOrder[orderRef].eggsCounter += eggsCounter;
        shoppingCart.orders[orderRef].products[eggsOrder[orderNumber].eggsNumber].amount = eggsOrder[orderRef].eggsCounter;
        
    } 

    else {

        eggsOrder.push({eggsNumber:0, productNumber:0, eggsCounter:0})
        eggsOrder[orderNumber].eggsNumber = eggsOrder[orderNumber].productNumber;
        shoppingCart.orders[orderNumber].products.push({productId:eggsID, amount:eggsCounter, price:productIds["002"].price});
        eggsOrder[orderNumber].productNumber ++;
        firstEggs = false;

    } 

    shoppingCart.totalCost = totalCounter + deliveryCounter;
    shoppingCart.totalOrdersCost = totalCounter;
    shoppingCart.totalDeliveryFee = deliveryCounter;

}

function addMilk() {

    if (cartActive == false)
    {
        cartActive = true;
        userNumber ++;
        orderNumber ++;
        shoppingCart.orders[orderNumber].orderID = orderNumber;
         
        
    }

    if (firstMilk == false) {

        milkOrder[orderRef].milkCounter += milkCounter;
        shoppingCart.orders[orderRef].products[milkOrder[orderNumber].milkNumber].amount = milkOrder[orderRef].milkCounter;
        
    } 

    else {

        milkOrder.push({milkNumber:0, productNumber:0, milkCounter:0})
        milkOrder[orderNumber].milkNumber = milkOrder[orderNumber].productNumber;
        shoppingCart.orders[orderNumber].products.push({productId:milkID, amount:milkCounter, price:productIds["003"].price});
        milkOrder[orderNumber].productNumber ++;
        firstMilk = false;

    } 

    shoppingCart.totalCost = totalCounter + deliveryCounter;
    shoppingCart.totalOrdersCost = totalCounter;
    shoppingCart.totalDeliveryFee = deliveryCounter;

}



function completeCart()  {

    orderNumber = 0;
    userNumber++;
    cartActive = false;
}

function uniqueOrderChecker() {

    orderReferences.push({date:itemArray.serviceDate, schedule:itemArray.serviceSchedule,
        supplier:itemArray.supplier, delivery:itemArray.deliveryType, orderID:orderNumber})
   
   for (let i = 0; i < orderReferences.length; i++)
   {
       if (JSON.stringify(orderReferences[orderReferences.length - 1]) === JSON.stringify(orderReferences[i])) 
       {
           orderNumber = orderReferences[orderReferences.length - 1].orderID;
           { break; }
       }
       else if (i == orderReferences.length - 1)
       orderNumber ++;
       
   }
}



export default router;

/*var productIds = {
    "001" : { name: "cheese", price: 50, firstCheese:false, productNumber:0, cheeseNumber:0 },
    "002" : { name: "eggs", price: 30, firstEggs:false, productNumber:0, eggsNumber:0  },
    "003" : { name: "milk", price: 2000, firstMilk:false, productNumber:0, milkNumber:0  }
}

var cheeseOrder = [];

cheeseOrder.splice(orderNumber, 0, productIds["001"]) //orderNumber = 0
        console.log(cheeseOrder);
        cheeseOrder[orderNumber]["001"].cheeseNumber = cheeseOrder[orderNumber]["001"].productNumber;*/