

let standingsData =[];


async function fetchStandings (leagueId = '4328') {const errorDiv = document.getElementById('error-message');
    const tableBody = document.getElementById('table-body');
    errorDiv.classList.add('hidden');
    tableBody.innerHTML = '<tr><td colspan="8">Loading data...</td></tr>';
    try {
        
        const response = await fetch (`/api/standings?league=${leagueId}`);
        if (!response.ok) { 
            throw new Error ('API returned an error');
        }
        const data = await response.json();
        if (data.table && data.table.length > 0) {
            standingsData = data.table;
            renderTable (standingsData);
        } else {
            throw new Error ('No data found');
        }
    } catch (error) { 
        console.error(error);
        errorDiv.textContent = 'No standings data available for this league right now.';
        errorDiv.classList.remove('hidden');
        tableBody.innerHTML = '';
    }
}
function renderTable(data) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML= '';
    data.forEach(team => {
        const row=document.createElement('tr');
        
        row.innerHTML = `
        <td>${team.intRank}</td>
        <td class="team-name">
        <img src="${team.strBadge}" alt="badge" style="height: 20px; margin-right :8px;">
            ${team.strTeam}
            </td>
            <td>${team.intPlayed}</td>
            <td>${team.intWin}</td>
            <td>${team.intDraw}</td>
            <td>${team.intLoss}</td>
            <td>${team.intGoalDifference}</td>
            <td><strong>${team.intPoints}</strong></td>
            `;
            tableBody.appendChild(row);
    });
}
function sortTable(column) {
    const isAscending = document.getElementById('standings-table').getAttribute('data-sort-asc') === 'true';
    const direction = isAscending ? 1 : -1;

    standingsData.sort((a, b) => {
        let valA, valB;

        if (column === 'points') { valA = parseInt(a.intPoints); valB = parseInt(b.intPoints); }
        else if (column === 'played') { valA = parseInt(a.intPlayed); valB = parseInt(b.intPlayed); }
        else if (column === 'win') { valA = parseInt(a.intWin); valB = parseInt(b.intWin); }
        else if (column === 'draw') { valA = parseInt(a.intDraw); valB = parseInt(b.intDraw); }
        else if (column === 'loss') { valA = parseInt(a.intLoss); valB = parseInt(b.intLoss); }
        else if (column === 'gd') { valA = parseInt(a.intGoalDifference); valB = parseInt(b.intGoalDifference); }
        
        if (valA < valB) return -1 * direction;
        if (valA > valB) return 1 * direction;
        return 0;
    });
    

    document.getElementById('standings-table').setAttribute('data-sort-asc', !isAscending);
    renderTable(standingsData);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchStandings();

    const leagueSelect = document.getElementById('league-select');
    leagueSelect.addEventListener('change', (e) => {
        fetchStandings(e.target.value);
    });

    const headers = document.querySelectorAll('th.sortable');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const sortKey = header.getAttribute('data-sort');
            sortTable(sortKey);
        });
    });
    
});
