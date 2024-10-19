document.addEventListener('DOMContentLoaded', function () {
  const chartTab = document.getElementById('chart-tab');
  const downloadButton = document.getElementById('download');
  let myBarChart;

  // input with id "username" on change
  document.getElementById('username').addEventListener('input', function () {
    const username = this.value;

    // regex to check if username has at least 1 capital letter, 1 special character, 1 number, and 8 characters long
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;

    if (regex.test(username)) {
      // set the username input border to green
      this.style.border = '1px solid green';
    } else {
      // set username input border to red
      this.style.border = '1px solid red';
    }
  });

  chartTab.addEventListener('click', function () {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let monthLabels = [];
    let incomeData = [];
    let expensesData = [];
    months.forEach(month => {
      const income = document.querySelector(`#${month.toLowerCase()}-income`).value;
      const expenses = document.querySelector(`#${month.toLowerCase()}-expenses`).value;
      monthLabels.push(month);
      incomeData.push(income);
      expensesData.push(expenses);
    });


    if (myBarChart) {
      myBarChart.destroy();
    }

    const ctx = document.getElementById('myBarChart').getContext('2d');
    myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: monthLabels,
        datasets: [{
          label: 'Income',
          data: incomeData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }, {
          label: 'Expenses',
          data: expensesData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });

  downloadButton.addEventListener('click', function () {
    const canvas = document.getElementById('myBarChart');
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'chart.png';
    link.click();
  });
});
