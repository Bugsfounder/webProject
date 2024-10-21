document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/api/employees')
        .then(response => {
            console.log(response); // Log the entire response
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let app = document.getElementById('app');
            let html = '<ul>';
            data.forEach(emp => {
                html += `<li>${emp.FirstName} ${emp.LastName} - ${emp.Salary}</li>`;
            });
            html += '</ul>';
            app.innerHTML = html;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});
