import data from "./data.json";
/*
{
       "id": 1,
       "name": "Pernell Cleverly",
       "slug": "pernell-cleverly",
       "email": "pcleverly0@csmonitor.com",
       "datetime": "30/03/2022 11:51 PM",
       "agree": "Yes",
       "size": "Large",
       "address": [
           "2128",
           "Summit",
           "Place"
       ]
   }
*/

let jsTable = document.getElementById("htmlTable");






const formattedData = data.map(item => {
  let PM = false;
  const newDate = new Date(item.datetime);
  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  let hour = newDate.getHours();
  let minute = newDate.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (hour < 12) {
    minute = minute + " AM";
  }
  if (hour === 12) {
    minute = minute + " PM";
  }
  if (hour > 12) {
    PM = true;
    if (hour === 13) {
      hour = 1
    }
    if (hour === 14) {
      hour = 2
    }
    if (hour === 15) {
      hour = 3
    }
    if (hour === 16) {
      hour = 4
    }
    if (hour === 17) {
      hour = 5
    }
    if (hour === 18) {
      hour = 6
    }
    if (hour === 19) {
      hour = 7
    }
    if (hour === 20) {
      hour = 8
    }
    if (hour === 21) {
      hour = 9
    }
    if (hour === 22) {
      hour = 10
    }
    if (hour === 23) {
      hour = 11
    }

  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  let agree = item.agree;
  if (agree === true) {
    agree = "Yes";
  } else {
    agree = "No";
  }
  let size = item.size;
  if (size === "XS") {
    size = "Extra Small"
  }
  if (size === "S") {
    size = "Small"
  }
  if (size === "M") {
    size = "Medium"
  }
  if (size === "L") {
    size = "Large"
  }
  if (size === "XL") {
    size = "Extra Large"
  }
  if (size === "2XL") {
    size = "2 Extra Large"
  }
  if (size === "3XL") {
    size = "3 Extra Large"
  }
  const name = `${item.first_name} ${item.last_name}`;
  if (PM === true) {
    minute = minute + " PM";
  }
  let address = item.address;
  let word = "";
  let arrayOfWords = [];
  let i = 0;
  while (i < address.length) {
    if (address[i] === " ") {
      arrayOfWords.push(word)
      word = ""
    }
    if (address[i] != " ") {
      word = word + address[i]
    }
    i++
    if (i === address.length) {
      arrayOfWords.push(word)
    }
  }
  address = arrayOfWords;
  if (address[3] === undefined) {
    address[3] = ""
  }

  return {
    id: item.id,
    name: name,
    slug: name.replace(' ', '-').toLowerCase(),
    email: item.email,
    datetime: `${day}/${month}/${year} ${hour}:${minute}`,
    agree: agree,
    size: size,
    address: `${address[0]}, ${address[1]}, ${address[2]} ${address[3]}`
  };
});

for (let j = 0; j < formattedData.length; j++) {
  let jsRow = jsTable.insertRow();
  for (let i = 0; i < 1; i++) {
    let jsCell = jsRow.insertCell();
    let jsText = document.createTextNode(formattedData[j].name)
    jsCell.appendChild(jsText);
    for (let i = 0; i < 1; i++) {
      let jsCell = jsRow.insertCell();
      let jsText = document.createTextNode(formattedData[j].slug)
      jsCell.appendChild(jsText);
    }
    for (let i = 0; i < 1; i++) {
      let jsCell = jsRow.insertCell();
      let jsText = document.createTextNode(formattedData[j].email)
      jsCell.appendChild(jsText);
    }
    for (let i = 0; i < 1; i++) {
      let jsCell = jsRow.insertCell();
      let jsText = document.createTextNode(formattedData[j].agree)
      jsCell.appendChild(jsText);
    }
    for (let i = 0; i < 1; i++) {
      let jsCell = jsRow.insertCell();
      let jsText = document.createTextNode(formattedData[j].size)
      jsCell.appendChild(jsText);
    }
    for (let i = 0; i < 1; i++) {
      let jsCell = jsRow.insertCell();
      let jsText = document.createTextNode(formattedData[j].address)
      jsCell.appendChild(jsText);
    }
  }
}




const tableBody = jsTable.querySelector("tbody");
const rows = tableBody.querySelectorAll("tr");

selected = tableBody.getElementsByClassName('selected');
console.log(selected)

const sortColumn = function(index) {
  const newRows = Array.from(rows);

  newRows.sort(function(rowA, rowB) {
    const cellA = rowA.querySelectorAll("td")[index].innerHTML;
    const cellB = rowB.querySelectorAll("td")[index].innerHTML;

    switch (true) {
      case cellA > cellB:
        return 1;
      case cellA < cellB:
        return -1
      case cellA === cellB:
        return 0;
    }

  });

  [].forEach.call(rows, function(row) {
    tableBody.removeChild(row);

  });


  newRows.forEach(function(newRow) {
    tableBody.appendChild(newRow);
  });
}
const headers = jsTable.querySelectorAll("th");



[].forEach.call(headers, function(header, index) {
  header.addEventListener('click', function() {
    // This function will sort the column
    console.log("hi")
    sortColumn(index);
  });
});

newRows.sort(function(rowA, rowB) {
  const cellA = rowA.querySelectorAll("td")[index].innerHTML;
  const cellB = rowB.querySelectorAll("td")[index].innerHTML;
});

const transform = function(index, content) {
  const type = headers[index].getAttribute("data-type");
  switch (type) {
    case "number":
      return parseFloat(content);
    case "string":
    default:
      return content;

  }
};

newRows.sort(function(rowA, rowB) {
  const cellA = rowA.querySelectorAll("td")[index].innerHTML;
  const cellB = rowB.querySelectorAll("td")[index].innerHTML;

  const a = transform(index, cellA);
  const b = transform(index, cellB);

  switch (true) {
    case a > b:
      return 1;
    case a < b:
      return -1;
    case a === b:
      return 0;

  }
});

const directions = Array.from(headers).map(function(header) {
  return "";
});


function test() {
  console.log("from the test function")
}
console.table(formattedData);

