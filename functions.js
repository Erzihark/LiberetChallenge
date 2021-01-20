import { v4 as uuidv4 } from 'uuid'; 



var cheeseID = "001";
var eggsID = "002";
var milkID = "003";

var shoppingCart = 
{
    orders:
    [
        {
            orderID: String,
            products:
            [
                {
                    productID: String,
                    amount: Number,
                    productPrice: Number
                }
            ],    
            orderCost: Number,
            orderDeliveryFee: Number
        }
        
    ],
    totalDeliveryFee: Number,
    totalOrdersCost: Number,
    totalCost: Number
};

shoppingCart.totalCost = 10;
shoppingCart.orders[0].products[0].productID = "asd";
shoppingCart.orders[0].orderID = 1;

var cartActive = false;

function addCheese() {

    if (cartActive = false)
    {
        cartActive = true;
        userNumber ++;
        orderNumber ++;
        res.send(`Order ${orderNumber} started for user ${userNumber} `)
    }

    if (shoppingCart.orders[orderNumber].products[cheeseNumber].amount >= 1) {

        shoppingCart.orders[orderNumber].products[cheeseNumber].amount ++;
        
    } 

    else {

        shoppingCart.orders[orderNumber].products[productNumber].productID = cheeseID;
        shoppingCart.orders[orderNumber].products[productNumber].amount = 1;
        cheeseNumber = productNumber
        productNumber ++;

    } 

    res.send('Cheese added to cart!');

}

function addEggs() {

    if (cartActive = false)
    {
        cartActive = true;
        userNumber ++;
        orderNumber ++; 
    }

    if (shoppingCart.orders[orderNumber].products[eggsNumber].amount >= 1) {

        shoppingCart.orders[orderNumber].products[eggsNumber].amount ++;
        
    } 

    else {

        shoppingCart.orders[orderNumber].products[productNumber].productID = eggsID;
        shoppingCart.orders[orderNumber].products[productNumber].amount = 1;
        eggsNumber = productNumber
        productNumber ++;

    } 

}

function addMilk() {

    if (cartActive = false)
    {
        cartActive = true;
        userNumber ++;
        orderNumber ++; 
    }

    if (shoppingCart.orders[orderNumber].products[milkNumber].amount >= 1) {

        shoppingCart.orders[orderNumber].products[milkNumber].amount ++;
        
    } 

    else {

        shoppingCart.orders[orderNumber].products[productNumber].productID = milkID;
        shoppingCart.orders[orderNumber].products[productNumber].amount = 1;
        milkNumber = productNumber
        productNumber ++;

    } 

}


function deleteItem()  {

    if (cartActive = false)
    {
        res.send('Cannot delete items on an empty cart'); 
    }
    else
    shoppingCart.orders[orderNumber].products = shoppingCart.orders[orderNumber].products.filter((itemToDelete) => itemToDelete.id != id)

}

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    //filters all carts so that only the one that is removed is the currently selected one                                        
    carts = carts.filter((cart) => cart.id != id); 
    res.send(`cart with the id ${id} deleted from the database`)
})

function completeCart()  {

    orderNumber++;
    userNumber++;
    cartActive = false;
}
