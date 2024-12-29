// Contadores de exercícios e atributos do personagem
let agachamentoCount = 0;
let flexaoCount = 0;
let abdominaisCount = 0;
let corridaDistance = 0;

let characterStats = {
    strength: 10,
    agility: 8,
    intelligence: 12,
};

// Função para atualizar a visão geral do personagem
function updateCharacterStats() {
    document.getElementById('strength').innerText = characterStats.strength;
    document.getElementById('agility').innerText = characterStats.agility;
    document.getElementById('intelligence').innerText = characterStats.intelligence;
}

// Função para exibir a seção correspondente
function showSection(sectionId) {
    // Esconde todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Mostra a seção que foi clicada
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');
}

// Função para completar um exercício (diminui 10 a cada clique)
function completeExercise(exercise) {
    const progressElement = document.getElementById(`${exercise}-progress`);
    const button = document.querySelector(`button[onclick="completeExercise('${exercise}')"]`);

    // Verificar se já passaram 24 horas desde a última conclusão
    const lastCompleted = localStorage.getItem(`${exercise}-lastCompleted`);
    const currentTime = new Date().getTime();

    if (lastCompleted) {
        const timePassed = currentTime - lastCompleted;
        const timeRemaining = 24 * 60 * 60 * 1000 - timePassed; // 24 horas em milissegundos

        if (timeRemaining > 0) {
            const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            // Atualizar o progresso com o tempo restante
            progressElement.textContent = `Faltam ${hours}h ${minutes}m ${seconds}s para realizar novamente.`;
            button.disabled = true; // Desabilitar o botão
            return;
        }
    }

    // Se passou 24 horas ou nunca foi feito, continuar com a contagem dos exercícios
    if (exercise === 'agachamento') {
        agachamentoCount += 10;
        if (agachamentoCount >= 20) {
            alert('Você completou 20 agachamentos!');
            characterStats.agility += 10; // Aumenta a agilidade
        }
        document.getElementById('agachamento-progress').innerText = `Faltam ${20 - agachamentoCount} agachamentos`;
    } else if (exercise === 'flexao') {
        flexaoCount += 10;
        if (flexaoCount >= 20) {
            alert('Você completou 20 flexões!');
            characterStats.strength += 10; // Aumenta a força
        }
        document.getElementById('flexao-progress').innerText = `Faltam ${20 - flexaoCount} flexões`;
    } else if (exercise === 'abdominais') {
        abdominaisCount += 10;
        if (abdominaisCount >= 20) {
            alert('Você completou 20 abdominais!');
            characterStats.intelligence += 10; // Aumenta a inteligência
        }
        document.getElementById('abdominais-progress').innerText = `Faltam ${20 - abdominaisCount} abdominais`;
    } else if (exercise === 'corrida') {
        corridaDistance += 1;
        if (corridaDistance >= 1) {
            alert('Você completou 1 km de corrida!');
            characterStats.agility += 10; // Aumenta a agilidade
        }
        document.getElementById('corrida-progress').innerText = `Faltam ${1 - corridaDistance} km de corrida`;
    }

    // Atualizar a visão geral do personagem
    updateCharacterStats();

    // Atualizar o horário da última conclusão
    localStorage.setItem(`${exercise}-lastCompleted`, currentTime);
}

// Função para criar o personagem
function createCharacter(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obter dados do formulário
    const nome = document.getElementById('nome').value;
    const forca = document.getElementById('forca').value;
    const agilidade = document.getElementById('agilidade').value;
    const inteligencia = document.getElementById('inteligencia').value;

    // Verificar se o nome foi preenchido
    if (!nome) {
        alert("Por favor, insira um nome para o personagem.");
        return;
    }

    // Criar um objeto de personagem
    const personagem = {
        nome: nome,
        imagem: 'm.jpg', // A imagem fixa será 'm.jpg'
        atributos: {
            forca: parseInt(forca),
            agilidade: parseInt(agilidade),
            inteligencia: parseInt(inteligencia),
        },
        nivel: 1,
        xp: 0
    };

    // Armazenar os dados do personagem no localStorage
    localStorage.setItem('personagem', JSON.stringify(personagem));

    // Ocultar a seção de cadastro e mostrar as demais seções
    document.getElementById('cadastro').classList.add('hidden');
    document.getElementById('ranking').classList.remove('hidden');
    document.getElementById('equipamentos').classList.remove('hidden');
    document.getElementById('personagem').classList.remove('hidden');
    document.getElementById('tarefas').classList.remove('hidden');

    // Carregar e mostrar as informações do personagem
    loadCharacter();
}

// Função para carregar os dados do personagem
function loadCharacter() {
    const personagem = JSON.parse(localStorage.getItem('personagem'));

    if (personagem) {
        // Atualizar a visão geral com os dados do personagem
        document.getElementById('character-name').textContent = personagem.nome;
        document.getElementById('character-level').textContent = personagem.nivel;

        // Exibir o nome e os atributos do personagem
        document.getElementById('personagem-info').innerHTML = `
            <h3>Nome: ${personagem.nome}</h3>
            <p><strong>Força:</strong> ${personagem.atributos.forca}</p>
            <p><strong>Agilidade:</strong> ${personagem.atributos.agilidade}</p>
            <p><strong>Inteligência:</strong> ${personagem.atributos.inteligencia}</p>
            <img src="${personagem.imagem}" alt="../imagem.m.jpg" width="150">
        `;
    }
}

// Atualizar a visão geral do personagem na primeira carga da página
window.onload = function() {
    if (localStorage.getItem('personagem')) {
        loadCharacter();  // Carregar dados do personagem, se existirem
    }
};








