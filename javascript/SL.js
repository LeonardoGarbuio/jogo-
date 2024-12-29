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

    // Inicializar progresso das tarefas no localStorage
    const progressoTarefas = {
        agachamento: 0,
        flexao: 0,
        abdominais: 0,
        corrida: 0
    };
    localStorage.setItem('progressoTarefas', JSON.stringify(progressoTarefas));

    // Ocultar a tela de login e mostrar a tela do personagem
    document.getElementById('login').classList.add('hidden');
    document.getElementById('personagem').classList.remove('hidden');

    // Carregar as informações do personagem
    loadCharacter();
    updateTaskProgress();  // Atualizar o progresso das tarefas ao carregar
}

// Função para carregar os dados do personagem
function loadCharacter() {
    const personagem = JSON.parse(localStorage.getItem('personagem'));

    if (!personagem) {
        console.error('Personagem não encontrado no localStorage');
        return;
    }

    // Atualizar a visão geral com os dados do personagem
    document.getElementById('character-name').textContent = personagem.nome;
    document.getElementById('character-level').textContent = personagem.nivel;
    document.getElementById('strength').textContent = personagem.atributos.forca;
    document.getElementById('agility').textContent = personagem.atributos.agilidade;
    document.getElementById('intelligence').textContent = personagem.atributos.inteligencia;
}

// Função para atualizar o progresso das tarefas
function updateTaskProgress() {
    let progressoTarefas = JSON.parse(localStorage.getItem('progressoTarefas'));

    if (!progressoTarefas) {
        // Se não houver dados de progresso, inicialize
        progressoTarefas = {
            agachamento: 0,
            flexao: 0,
            abdominais: 0,
            corrida: 0
        };
        localStorage.setItem('progressoTarefas', JSON.stringify(progressoTarefas));
    }

    document.getElementById('agachamento-progress').innerText = `Faltam ${20 - progressoTarefas.agachamento} agachamentos`;
    document.getElementById('flexao-progress').innerText = `Faltam ${20 - progressoTarefas.flexao} flexões`;
    document.getElementById('abdominais-progress').innerText = `Faltam ${20 - progressoTarefas.abdominais} abdominais`;
    document.getElementById('corrida-progress').innerText = `Faltam ${1 - progressoTarefas.corrida} km de corrida`;
}

// Função para completar um exercício (diminui 10 a cada clique)
function completeExercise(exercise) {
    const progressoTarefas = JSON.parse(localStorage.getItem('progressoTarefas'));
    const progressElement = document.getElementById(`${exercise}-progress`);
    const button = document.querySelector(`button[onclick="completeExercise('${exercise}')"]`);

    console.log(`Iniciando o exercício: ${exercise}`);

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

            console.log(`Faltam ${hours}h ${minutes}m ${seconds}s para realizar novamente.`);
            // Atualizar o progresso com o tempo restante
            progressElement.textContent = `Faltam ${hours}h ${minutes}m ${seconds}s para realizar novamente.`;
            button.disabled = true; // Desabilitar o botão
            return;
        }
    }

    // Se passou 24 horas ou nunca foi feito, continuar com a contagem dos exercícios
    if (exercise === 'agachamento') {
        progressoTarefas.agachamento += 10;
        if (progressoTarefas.agachamento >= 20) {
            alert('Você completou 20 agachamentos!');
        }
        document.getElementById('agachamento-progress').innerText = `Faltam ${20 - progressoTarefas.agachamento} agachamentos`;
    } else if (exercise === 'flexao') {
        progressoTarefas.flexao += 10;
        if (progressoTarefas.flexao >= 20) {
            alert('Você completou 20 flexões!');
        }
        document.getElementById('flexao-progress').innerText = `Faltam ${20 - progressoTarefas.flexao} flexões`;
    } else if (exercise === 'abdominais') {
        progressoTarefas.abdominais += 10;
        if (progressoTarefas.abdominais >= 20) {
            alert('Você completou 20 abdominais!');
        }
        document.getElementById('abdominais-progress').innerText = `Faltam ${20 - progressoTarefas.abdominais} abdominais`;
    } else if (exercise === 'corrida') {
        progressoTarefas.corrida += 1;
        if (progressoTarefas.corrida >= 1) {
            alert('Você completou 1 km de corrida!');
        }
        document.getElementById('corrida-progress').innerText = `Faltam ${1 - progressoTarefas.corrida} km de corrida`;
    }

    // Atualizar o horário da última conclusão
    localStorage.setItem(`${exercise}-lastCompleted`, currentTime);

    // Atualizar o progresso das tarefas no localStorage
    localStorage.setItem('progressoTarefas', JSON.stringify(progressoTarefas));
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

// Atualizar a visão geral do personagem na primeira carga da página
window.onload = function() {
    // Verifica se o personagem já foi criado e carrega seus dados
    if (localStorage.getItem('personagem')) {
        loadCharacter();
    } else {
        console.error('Personagem não encontrado na primeira carga.');
    }
    updateTaskProgress();  // Atualiza o progresso das tarefas na carga da página
};








