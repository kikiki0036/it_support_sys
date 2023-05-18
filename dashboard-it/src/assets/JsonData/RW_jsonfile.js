const fs = require("fs");

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
      if (err) {
        return cb && cb(err);
      }
      try {
        const object = JSON.parse(fileData);
        return cb && cb(null, object);
      } catch (err) {
        return cb && cb(err);
      }
    });
}

//   jsonReader("./customer.json", (err, customer) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log(customer.address); // => "Infinity Loop Drive"
//   });

// const customer = {
//     "pets": [

//         {
//             name: "Newbie Co.",
//             order_count: 0,
//             address: "Po Box City",
//             favFoods : ["wet food", "dry food", "<strong>any</strong> food"],
//         },
        
//       ]
// }

// fs.writeFile('./newCustomer.json', JSON.stringify(customer, null, 2), err => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('File successfully written!')
//     }
// });
// const jsonReaderOptionService = () => {
  
  jsonReader("./service_options.json", (err, data) => {

    if (err) {
        console.log("Error reading file:", err);
        return;
    } else {
        // increase customer order count by 1
        // data.order_count += 1;
        console.log(data.service.length)
        // data.service[data.service.length] = customer;

        fs.readFile("./service_items.json", (err, data_item) => {
        
            const object = JSON.parse(data_item);

            console.log(object.item[data.service[0].option[0].items[0]-1]);
            console.log(object.item[data.service[0].option[0].items[1]-1]);
            console.log(object.item[data.service[0].option[0].items[2]-1]);
            console.log(object.item[data.service[0].option[0].items[3]-1]);
          
        });
        // fs.writeFile("./service_options.json", JSON.stringify(data, null, 2), err => {
        //     if (err) console.log("Error writing file:", err);
        // });  
    }

  });

// }
