const chemicals = [
  { id: 1, name: "Ammonium Persulfate", vendor: "LG Chem", density: 3525.92, viscosity: 60.63, packaging: "Bag", packSize: "100.00 kg", unit: "kg", quantity: 6495.18 },
  { id: 2, name: "Caustic Potash", vendor: "Formosa", density: 3172.15, viscosity: 48.22, packaging: "Bag", packSize: "100.00 kg", unit: "kg", quantity: 8751.90 },
  { id: 3, name: "Dimethylaminopropylamine", vendor: "LG Chem", density: 843.37, viscosity: 12.62, packaging: "Barrel", packSize: "75.00 L", unit: "L", quantity: 5964.61 },
  { id: 4, name: "Mono Ammonium Phosphate", vendor: "Sinopec", density: 1597.65, viscosity: 76.51, packaging: "Bag", packSize: "105.00 kg", unit: "kg", quantity: 8183.73 },
  { id: 5, name: "Ferric Nitrate", vendor: "DowDuPont", density: 364.04, viscosity: 14.90, packaging: "Bag", packSize: "105.00 kg", unit: "kg", quantity: 4154.33 },
  { id: 6, name: "n-Pentane", vendor: "Sinopec", density: 4535.26, viscosity: 66.76, packaging: "N/A", packSize: "N/A t", unit: "t", quantity: 6272.34 },
  { id: 7, name: "Glycol Ether PM", vendor: "LG Chem", density: 6495.18, viscosity: 72.12, packaging: "Bag", packSize: "250.00 kg", unit: "kg", quantity: 8749.54 },
  { id: 8, name: "Acetic Acid", vendor: "Formosa", density: 1049.12, viscosity: 15.43, packaging: "Barrel", packSize: "200.00 L", unit: "L", quantity: 5300.00 },
  { id: 9, name: "Sodium Hypochlorite", vendor: "BASF", density: 1120.50, viscosity: 25.60, packaging: "Container", packSize: "500.00 L", unit: "L", quantity: 7650.22 },
  { id: 10, name: "Calcium Chloride", vendor: "LG Chem", density: 2150.36, viscosity: 34.77, packaging: "Bag", packSize: "50.00 kg", unit: "kg", quantity: 9900.34 },
  { id: 11, name: "Potassium Nitrate", vendor: "Sinopec", density: 2102.88, viscosity: 44.21, packaging: "Drum", packSize: "180.00 kg", unit: "kg", quantity: 8600.11 },
  { id: 12, name: "Boric Acid", vendor: "LG Chem", density: 1700.45, viscosity: 30.33, packaging: "Bag", packSize: "120.00 kg", unit: "kg", quantity: 7200.59 },
  { id: 13, name: "Ethanol", vendor: "DowDuPont", density: 789.25, viscosity: 1.20, packaging: "Barrel", packSize: "160.00 L", unit: "L", quantity: 2560.40 },
  { id: 14, name: "Isopropyl Alcohol", vendor: "BASF", density: 785.50, viscosity: 2.37, packaging: "Drum", packSize: "220.00 L", unit: "L", quantity: 4331.10 },
  { id: 15, name: "Hydrochloric Acid", vendor: "Formosa", density: 1180.77, viscosity: 6.47, packaging: "Container", packSize: "550.00 L", unit: "L", quantity: 6453.73 }
];

const originalChemicals = [...chemicals]; // Store a copy of the original data

let selectedColumn = null;
let isAscending = true;

function loadTableData(chemicals) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  chemicals.forEach((chemical, index) => {
      let row = `<tr>
          <td>✔</td>
          <td contenteditable="true" onblur="updateChemical(${index}, 'name', this.innerText)">
          <span>${chemical.id}</span> <span style="margin-left: 24px;">${chemical.name}</span> 
          <td contenteditable="true" onblur="updateChemical(${index}, 'vendor', this.innerText)">${chemical.vendor}</td>
          <td contenteditable="true" onblur="updateChemical(${index}, 'density', this.innerText)">${chemical.density}</td>
          <td contenteditable="true" onblur="updateChemical(${index}, 'viscosity', this.innerText)">${chemical.viscosity}</td>
          <td contenteditable="true" onblur="updateChemical(${index}, 'packaging', this.innerText)">${chemical.packaging}</td>
          <td contenteditable="true" onblur="updateChemical(${index}, 'packSize', this.innerText)">${chemical.packSize}</td>
          <td contenteditable="true" onblur="updateChemical(${index}, 'unit', this.innerText)">${chemical.unit}</td>
          <td contenteditable="true" onblur="updateChemical(${index}, 'quantity', this.innerText)">${chemical.quantity}</td>
          <td><i class="fas fa-trash" onclick="deleteChemical(${index})"></i></td>
      </tr>`;
      tableBody.innerHTML += row;
  });
}

function addChemical() {
  const newId = chemicals.length + 1; // Generate new ID
  const newChemical = {id: newId, name: '', vendor: '', density: '', viscosity: '', packaging: '', packSize: '', unit: '', quantity: ''};
  chemicals.push(newChemical);
  loadTableData(chemicals);
  document.getElementById('table-body').lastElementChild.scrollIntoView();
}

function refreshTable() {
  chemicals.length = 0;
  chemicals.push(...originalChemicals); 
  loadTableData(chemicals); 
  selectedColumn = null; 
  isAscending = true;
}


function deleteChemical(index) {
  chemicals.splice(index, 1);
  loadTableData(chemicals);
}

function updateChemical(index, field, value) {
  chemicals[index][field] = value.trim();
  loadTableData(chemicals);
}

function sortTable(columnIndex) {
  const columns = ['id', 'name', 'vendor', 'density', 'viscosity', 'packaging', 'packSize', 'unit', 'quantity'];
  const column = columns[columnIndex];

  if (selectedColumn === column) {
    isAscending = !isAscending;
  } else {
    selectedColumn = column;
    isAscending = true;
  }

  chemicals.sort((a, b) => {
    const valueA = typeof a[column] === 'string' ? a[column].toLowerCase() : a[column];
    const valueB = typeof b[column] === 'string' ? b[column].toLowerCase() : b[column];
    
    if (valueA < valueB) return isAscending ? -1 : 1;
    if (valueA > valueB) return isAscending ? 1 : -1;
    return 0;
  });

  loadTableData(chemicals);
}


loadTableData(chemicals);