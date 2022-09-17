//In this kata you will have to write a function that takes litres and pricePerLitre (in dollar) as arguments.

//Purchases of 2 or more litres get a discount of 5 cents per litre, purchases of 4 or more litres get a discount of 10 cents per litre, and so on every two litres, up to a maximum discount of 25 cents per litre. But total discount per litre cannot be more than 25 cents. Return the total cost rounded to 2 decimal places. Also you can guess that there will not be negative or non-numeric inputs.

//Good Luck!

//Note
//1 Dollar = 100 Cents

// the parmaters are numbers, the returns should be in dollars purchases of 2 liters get a disount of 5 cents per litere, purchases of 4 or ore get a discount of 10 cents per liter and continues to go up for every to litersto the point of a max disount of 25 cents per literes. example  2 or more liters =5  cents discount per litere, purchase of 4 =or more gets a discount of 10 cents per litere 4+x x=2 or multiple of 2 to a maximum of 25 cents per litre ( not to exceed 25 cents). Return the total cost rounded to decimal places. Remember 1 dollar equals 100 cents

function fuelPrice(litres, pricePerLiter) {
    for (var i = 2; i <= 10; i +=2) { //discount loop
      if (litres >= i) {
        pricePerLiter -= 0.05;
      }
    }
    return(Math.round(litres * pricePerLiter * 100) / 100)
  }
  
fuelPrice( 8,2.5)
