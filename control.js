    let records = [];
    let form = document.querySelector('form').addEventListener("submit",(event) => {
        event.preventDefault();

        let item = document.querySelector("#item").value;
        let price = document.querySelector("#price").value;
        let quantity = document.querySelector("#quantity").value;
        item = item.trim();
        price = price.trim();
        quantity = quantity.trim();
        if(item =="" || price == "" || quantity == "") {
            window.alert("Item,Price and Quantity is required \nPlease check those data");
            return false;
        }
        let record = {
            item,price,quantity
        }
        console.log(record);
        document.querySelector("form").reset();
        document.querySelector("#item").focus();

        //push to array
        //records.push(record);

        //using unshift()
        records.unshift(record);

        displayRecords();
        item = price = quantity = "";
    })
    function displayRecords() {
        let tbody = document.querySelector('table tbody');
        tbody.innerHTML = "";
        let total = 0;
        let itemCount = 0;
        records.forEach((record,index)=> {
            const template = document.querySelector("template").content;
            let tr = template.cloneNode(true);
            tr.querySelector('.count').textContent = index + 1;
            tr.querySelector('.name').textContent = record.item;
            tr.querySelector('.rate').textContent = record.price;
            tr.querySelector('.quantity').textContent = record.quantity;
            tr.querySelector('.total').textContent = record.price * record.quantity;
            tr.querySelector(".delete").onclick = () => {
                if(confirm("Are you sure ?")) {
                    records.splice(index,1);
                    displayRecords();
                }
            }
            tr.querySelector(".edit").onclick = () => {
                document.querySelector("#item").value = record.item;
                document.querySelector("#price").value = record.price;
                document.querySelector("#quantity").value = record.quantity;

                records.splice(index,1);
                displayRecords();
            }
            tbody.appendChild(tr);
            total += Number(record.price * record.quantity);
            itemCount ++;
        })
        document.querySelector(".grandTotal").textContent = total;
        document.querySelector("#itemCount").textContent = itemCount;
    }

    //sort by index;
    document.querySelector("#sortByIndex").onclick = () => {
        records.reverse();
        displayRecords();
    };


    
    //sort by name;

    document.querySelector("#sortByName").onclick = () =>{
        records.sort(function(a,b) {
            if(a.item < b.item) {
                return -1;
            }
            else if(a.item > b.item) {
                return 1;
            }
            else {
                return 0;
            }
        });
        displayRecords();
    }

    //sort by rate;
    document.querySelector("#sortByRate").onclick = () => {
        records.sort(function(a,b) {
            a.price = parseFloat(a.price);
            b.price = parseFloat(b.price);
            return a.price - b.price;
        });
        displayRecords();
    };

    //sort by quantity;
    document.querySelector("#sortByQuantity").onclick = () => {
        records.sort(function(a,b) {
            a.quantity = parseFloat(a.quantity);
            b.quantity = parseFloat(b.quantity);
            return a.quantity - b.quantity;
        });
        displayRecords();
    };

    //sort by total;
    document.querySelector("#sortByTotal").onclick = () => {
        records.sort(function(a,b) {
            a.total = parseFloat(a.price * a.quantity);
            b.total = parseFloat(b.price * b.quantity);
            return a.total - b.total;
        });
        displayRecords();
    };

    //clear table 
    document.querySelector("#clearBtn").onclick = () => {
        if(confirm("Do you want clear this records :")) {
            records = [];
            displayRecords();
            
        }
    }

            