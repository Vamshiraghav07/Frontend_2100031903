document.addEventListener('DOMContentLoaded', function() {
    const dataTable = document.getElementById('data-table');
    const filterInput = document.getElementById('filter-input');
    const paginationControls = document.getElementById('pagination-controls');
    const sortButton = document.getElementById('sort-button');
  
    const data = [
      { name: 'Alice', age: 25, city: 'New York' },
      { name: 'Bob', age: 30, city: 'San Francisco' },
      { name: 'Charlie', age: 35, city: 'Chicago' },
      { name: 'David', age: 40, city: 'Miami' },
      { name: 'Edward', age: 45, city: 'Dallas' },
      { name: 'Frank', age: 50, city: 'Austin' },
      { name: 'George', age: 55, city: 'Seattle' },
      { name: 'Hank', age: 60, city: 'Boston' },
      { name: 'Ivan', age: 65, city: 'Denver' },
      { name: 'Jack', age: 70, city: 'Houston' },
      
    ];
  
    let currentPage = 1;
    const rowsPerPage = 7;
    let sortOrder = 1; 
  
    function renderTableRows(data) {
      const tbody = dataTable.querySelector('tbody');
      tbody.innerHTML = '';
  
      data.forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(cellValue => {
          const td = document.createElement('td');
          td.textContent = cellValue;
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    }
  
    function paginater(data, page, rowsPerPage) {
      const startIndex = (page - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      return data.slice(startIndex, endIndex);
    }
  
    function renderPaginationControls(totalRows, rowsPerPage) {
      paginationControls.innerHTML = '';
      const totalPages = Math.ceil(totalRows / rowsPerPage);
  
      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = (i === currentPage) ? 'active' : '';
        button.addEventListener('click', function() {
          currentPage = i;
          updateTable();
        });
        paginationControls.appendChild(button);
      }
    }
  
    function updateTable() {
      const filteredData = data.filter(row => {
        return Object.values(row).some(value => 
          value.toString().toLowerCase().includes(filterInput.value.toLowerCase())
        );
      });
      const paginatedData = paginater(filteredData, currentPage, rowsPerPage);
      renderTableRows(paginatedData);
      renderPaginationControls(filteredData.length, rowsPerPage);
    }
  
    filterInput.addEventListener('input', function() {
      currentPage = 1;
      updateTable();
    });
  
    sortButton.addEventListener('click', function() {
      sortOrder = -sortOrder; 
      data.sort((a, b) => {
        if (a.name < b.name) return -1 * sortOrder;
        if (a.name > b.name) return 1 * sortOrder;
        return 0;
      });
      updateTable();
      sortButton.textContent = sortOrder === 1 ? 'Sort Ascending' : 'Sort Descending';
    });
  
    dataTable.querySelectorAll('th').forEach(th => {
      th.addEventListener('click', function() {
        const column = this.getAttribute('data-column');
        const order = this.dataset.order = -(this.dataset.order || -1);
  
        data.sort((a, b) => {
          return (a[column] > b[column] ? 1 : -1) * order;
        });
  
     
        dataTable.querySelectorAll('th').forEach(header => header.classList.remove('sorted-asc', 'sorted-desc'));
        this.classList.add(order === 1 ? 'sorted-asc' : 'sorted-desc');
  
        updateTable();
      });
    });
  
    updateTable();
  });
  