var food = {
    'Chicken Fried Rice': 10.00,
    'BBQ Pork': 12.00, 
    'Soy Chicken': 9.00,
    'Deep Fried Squid Tentacles': 5.00,
    'Kung Pao Chicken': 15.00,
    'Deep Fried Oyster': 22.00,
    'Salmon Bento Box': 10.00,
    'Waygu Steak Dinner': 100.00,
    'Omakase': 75.00,
    'Salmon Sushi': 4.00,
    'Bluefin tuna': 10.00,
    'Classic Hand Roll': 10.00,
    'Butter Chicken': 10.00,
    'Chicken Tiki Masala': 10.00,
    'Chicken Vindaloo': 10.00,
    'Lamb Biryani': 10.00,
    'Lam Vindaloo': 10.00,
    'Salmon and Lox Bagel': 10.00,
    'Breakfast Bagel': 4.00,
    'Vegan Breakfast Bagel': 7.00,
    'Americano': 3.00,
    'Latte': 3.00,
    'Iced Coffee': 3.00
}

var orderData = []

$(document).ready(function() {
    $('.alert').hide();
    $(".addOrderButton").click(function() {
        var parent = $(this).parent().text()
        var foodItem = parent.split("$")[0].trim()
        var price = parent.split("$")[1].split(" ")[0]
        orderData.push(foodItem)
        sessionStorage.setItem("orderData", orderData)
        $(".alert").fadeTo(1500, 500).slideUp(500, function(){
            $(".alert").slideUp(500);
             });
        console.log(orderData)
    })
    $('.close').click(function() {
        $('.alert').hide();
    })
})

function removeName(itemid, index) {
    var bigData = sessionStorage.getItem("orderData")
    var data = bigData.split(",")
    data.splice(index, 1)
    var total = 0
    $('#'+itemid).remove()
    $('#foodTotal').text(function() {
        for(var i = 0; i < data.length; i++) {
            total += food[data[i]]
        }
        return 'Food Total: $' + total.toFixed(2)
    });
    $('#hst').text(function() {
        return 'HST: $' + (total * 0.13).toFixed(2)
    });
    $('#totalPay').text(function() {
        return 'Total: $' + (total + total * 0.13 + 3.45).toFixed(2)
    });
    sessionStorage.setItem('orderData', data)
}

function getOrderData() {
    var bigData = sessionStorage.getItem("orderData")
    var data = bigData.split(",")
    if(data.length <= 1) {
        alert("You haven't added anything to you order!")
        return
    }
    var total = 0
    var idCount = 0
    console.log(data)
    var list = $('#orderList')
    for(var i = 0; i < data.length; i++) {
        var liEl = document.createElement('li')
        liEl.className = 'list-group-item d-flex justify-content-between align-items-center'
        liEl.id = idCount
        liEl.innerHTML = data[i] + ': $' + food[data[i]].toFixed(2)
        var button = document.createElement('button')
        button.className = 'btn btn-outline-danger'
        button.innerHTML = 'Remove Item'
        button.setAttribute('onClick', 'removeName("'+idCount+', '+i+'")')
        liEl.append(button)
        list.append(liEl)
        total += food[data[i]]
        idCount++
    }

    var priceList = $('#priceList')
    var foodTotalEl = document.createElement('li')
    foodTotalEl.id = 'foodTotal'
    foodTotalEl.className = 'list-group-item d-flex justify-content-between align-items-center'
    foodTotalEl.innerHTML = 'Food Total: $' + total.toFixed(2)
    priceList.append(foodTotalEl)
    var hstEl = document.createElement('li')
    hstEl.id = 'hst'
    hstEl.className = 'list-group-item d-flex justify-content-between align-items-center'
    hstEl.innerHTML = 'HST: $' + (total * 0.13).toFixed(2)
    priceList.append(hstEl)
    var deliveryEL = document.createElement('li')
    deliveryEL.id = 'delivery'
    deliveryEL.className = 'list-group-item d-flex justify-content-between align-items-center'
    deliveryEL.innerHTML = "Delivery Fee: $3.45"
    priceList.append(deliveryEL)
    var totalEl = document.createElement('li')
    totalEl.id = 'totalPay'
    totalEl.className = 'list-group-item d-flex justify-content-between align-items-center'
    totalEl.innerHTML = 'Total: $' + (total + total * 0.13 + 3.45).toFixed(2)
    priceList.append(totalEl)
}