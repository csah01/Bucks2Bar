document.addEventListener('DOMContentLoaded', () => {
  const chartTab = document.querySelector('#chart-tab');
  const downloadButton = document.querySelector('#download');
  const emailButton = document.querySelector('#sendEmail');
  let myBarChart;

  // input with id "username" on change
  document.querySelector('#username').addEventListener('input', ({ target }) => {
    const { value: username } = target;

    // regex to check if username has at least 1 capital letter, 1 special character, 1 number, and 8 characters long
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;

    target.style.border = regex.test(username) ? '1px solid green' : '1px solid red';
  });

  chartTab.addEventListener('click', () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthLabels = [];
    const incomeData = [];
    const expensesData = [];

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

    const ctx = document.querySelector('#myBarChart').getContext('2d');
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

  downloadButton.addEventListener('click', () => {
    const canvas = document.querySelector('#myBarChart');
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'chart.png';
    link.click();
  });

  emailButton.addEventListener('click', () => {
    const canvas = document.querySelector('#myBarChart');
    const image = canvas.toDataURL('image/png');
    const emailId = document.getElementById('email-id').value;
    if (emailId) {
      fetch(`http://localhost:3000/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emailId, image })
      })
      .then(response => {
        console.log("Response Status:", response.status, response, response.text(), response.json()); // Log the response status
        console.log("Response Headers:", response.headers.get('Content-Type')); // Log the response headers
        const contentType = response.headers.get("content-type");

        if (response.status === 200) {
          alert('Email sent successfully!');
        } else {
            alert('Failed to send email.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while sending the email.');
      });
    }
  });
});
