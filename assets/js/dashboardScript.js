function setMood(mood) {
    var moodButtons = document.querySelectorAll(".emoji");
    moodButtons.forEach(button => {
        button.classList.remove("selected");
    });

    var selectedEmoji = document.querySelector(`.emoji[data-mood="${mood}"]`);
    selectedEmoji.classList.add("selected");

    var btnColor = document.querySelector('.btnColor');
    var emojisContainer = document.querySelector('.emojis');
    var emojisContainerRect = emojisContainer.getBoundingClientRect();
    var selectedEmojiRect = selectedEmoji.getBoundingClientRect();
    var btnColorWidth = btnColor.offsetWidth;
    btnColor.style.left = (selectedEmojiRect.left - emojisContainerRect.left + (selectedEmojiRect.width - btnColorWidth) / 2) + "px";
}

// Limitar o numero de Caractere do nome
function limitChars(event) {
    var maxLength = parseInt(event.target.getAttribute("data-maxlength"));
    var currentText = event.target.textContent;
    
    if (currentText.length > maxLength) {
        var selection = window.getSelection();
        var startPos = selection.focusOffset;
        event.target.textContent = currentText.slice(0, maxLength);
        var newPos = startPos - (currentText.length - maxLength);
        newPos = Math.max(newPos, 0);
        selection.collapse(event.target.firstChild, newPos);
        return false;
    }
    return true;
}

// Impede que novos caracteres sejam inseridos
document.getElementById("Name").addEventListener("input", function(event) {
    if (!limitChars(event)) {
        event.preventDefault(); 
    }
});

// Restaura o texto original
function checkRequired(event) {
    var span = event.target;
    if (span.textContent.trim() === "") {
        alert("Nome Inválido");
        event.preventDefault(); 
        span.focus();
        span.textContent = span.getAttribute("data-original-text");
    }
}



// Adicionar uma nova demanda
function addDemand() {
    var tableBody = document.querySelector("#demand-table tbody");
    var taskInput = document.getElementById("task-input");
    var task = taskInput.value.trim(); 
    if (task !== "") {
        if (tableBody.rows.length >= 8) {
            alert("Número máximo de demandas atingido!");
            return; 
        }
        var newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${task}</td>
            <td><input type="checkbox" onchange="toggleCompleted(this)"></td>
            <td><button onclick="deleteDemand(this)">Excluir</button></td>
        `;
        taskInput.value = "";
        limitDemandRows();
    } else {
        alert("insira uma tarefa válida.");
    }
}

//Excluir demanda
function deleteDemand(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    limitDemandRows();
}

// Concluído/não concluído
function toggleCompleted(checkbox) {
    var row = checkbox.parentNode.parentNode;
    row.classList.toggle("completed", checkbox.checked);
}

//limitar o número de linhas na tabela
function limitDemandRows() {
    var tableBody = document.querySelector("#demand-table tbody");
    var maxRows = 8;
    var rowHeight = 30;
    var maxHeight = maxRows * rowHeight;

    if (tableBody.rows.length > maxRows) {
        tableBody.style.height = maxHeight + "px";
        tableBody.style.overflowY = "auto";
    } else {
        tableBody.style.height = "auto";
        tableBody.style.overflowY = "hidden";
    }
}


limitDemandRows();

// Abrir o gerenciador de arquivos para a escolha de uma nova imagem
function openFileExplorer() {
    document.getElementById('file-input').click();
}

function updateProfileImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        const profileImg = document.getElementById('profile-img');
        profileImg.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    }
}

function showIndicator() {
    document.getElementById('click-indicator').style.display = 'block';
}

function hideIndicator() {
    document.getElementById('click-indicator').style.display = 'none';
}
