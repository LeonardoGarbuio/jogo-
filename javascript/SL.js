'use strict';

// Função para exibir a seção correspondente
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Função para criar o personagem
function createCharacter() {
    const nome = document.getElementById('nome').value;
    const forca = document.getElementById('forca').value;
    const agilidade = document.getElementById('agilidade').value;
    const inteligencia = document.getElementById('inteligencia').value;

    if (!nome || !forca || !agilidade || !inteligencia) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const personagem = {
        nome,
        atributos: {
            forca: parseInt(forca),
            agilidade: parseInt(agilidade),
            inteligencia: parseInt(inteligencia),
        },
        nivel: 1,
        xp: 0
    };

    localStorage.setItem('personagem', JSON.stringify(personagem));

    // Inicializar progresso das tarefas e horários de conclusão
    const progressoTarefas = {
        agachamento: 20,
        flexao: 20,
        abdominais: 20,
        corrida: 1
    };
    const tarefasTempo = {
        agachamento: null,
        flexao: null,
        abdominais: null,
        corrida: null
    };

    localStorage.setItem('progressoTarefas', JSON.stringify(progressoTarefas));
    localStorage.setItem('tarefasTempo', JSON.stringify(tarefasTempo));

    // Atualizar informações do personagem na interface
    document.getElementById('character-name').textContent = `Nome: ${personagem.nome}`;
    document.getElementById('character-level').textContent = `Nível: ${personagem.nivel}`;
    document.getElementById('strength').textContent = `Força: ${personagem.atributos.forca}`;
    document.getElementById('agility').textContent = `Agilidade: ${personagem.atributos.agilidade}`;
    document.getElementById('intelligence').textContent = `Inteligência: ${personagem.atributos.inteligencia}`;

    // Exibir a seção do personagem e atualizar progresso das tarefas
    showSection('personagem');
    updateTaskProgress();
}

// Função para atualizar o progresso das tarefas
function updateTaskProgress() {
    const progressoTarefas = JSON.parse(localStorage.getItem('progressoTarefas')) || {
        agachamento: 20,
        flexao: 20,
        abdominais: 20,
        corrida: 1
    };

    document.getElementById('agachamento-progress').innerText = `Faltam ${progressoTarefas.agachamento} agachamentos`;
    document.getElementById('flexao-progress').innerText = `Faltam ${progressoTarefas.flexao} flexões`;
    document.getElementById('abdominais-progress').innerText = `Faltam ${progressoTarefas.abdominais} abdominais`;
    document.getElementById('corrida-progress').innerText = `Faltam ${progressoTarefas.corrida} km de corrida`;
}

// Função para completar uma tarefa
function completeExercise(exercise) {
    const progressoTarefas = JSON.parse(localStorage.getItem('progressoTarefas'));
    const tarefasTempo = JSON.parse(localStorage.getItem('tarefasTempo')) || {};

    const currentTime = Date.now();

    // Verificar se passou 24 horas desde a última conclusão
    if (tarefasTempo[exercise]) {
        const timeElapsed = currentTime - tarefasTempo[exercise];
        const timeRemaining = 24 * 60 * 60 * 1000 - timeElapsed; // 24 horas em milissegundos

        if (timeRemaining > 0) {
            const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            alert(`Você precisa esperar mais ${hours}h ${minutes}m para completar ${exercise} novamente.`);
            return;
        }
    }

    // Atualizar progresso
    if (progressoTarefas[exercise] > 0) {
        progressoTarefas[exercise] = Math.max(0, progressoTarefas[exercise] - 10); // Diminui 10 ou até 0
        if (progressoTarefas[exercise] === 0) {
            tarefasTempo[exercise] = currentTime; // Registrar horário de conclusão
            alert(`Você concluiu a tarefa de ${exercise}!`);
        }
    } else {
        alert(`A tarefa de ${exercise} já está concluída!`);
    }

    // Atualizar dados no localStorage
    localStorage.setItem('progressoTarefas', JSON.stringify(progressoTarefas));
    localStorage.setItem('tarefasTempo', JSON.stringify(tarefasTempo));

    // Atualizar a interface
    updateTaskProgress();
}

// Função para resetar todos os dados
function resetAll() {
    localStorage.clear();
    alert("Dados resetados!");
    location.reload();
}

// Verificar e carregar informações ao carregar a página
window.onload = function () {
    const personagem = JSON.parse(localStorage.getItem('personagem'));

    if (personagem) {
        // Atualizar informações do personagem
        document.getElementById('character-name').textContent = `Nome: ${personagem.nome}`;
        document.getElementById('character-level').textContent = `Nível: ${personagem.nivel}`;
        document.getElementById('strength').textContent = `Força: ${personagem.atributos.forca}`;
        document.getElementById('agility').textContent = `Agilidade: ${personagem.atributos.agilidade}`;
        document.getElementById('intelligence').textContent = `Inteligência: ${personagem.atributos.inteligencia}`;
        showSection('personagem');
        updateTaskProgress();
    } else {
        showSection('create-character');
    }
};










