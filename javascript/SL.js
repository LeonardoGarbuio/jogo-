<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tarefas de Personagem</title>
    <link rel="stylesheet" href="css/SL.css">
</head>
<body>
    <!-- Navegação -->
    <nav>
        <ul>
            <li><a href="#ranking" onclick="showSection('ranking')">Ranking</a></li>
            <li><a href="#equipamentos" onclick="showSection('equipamentos')">Equipamentos</a></li>
            <li><a href="#personagem" onclick="showSection('personagem')">Personagem</a></li>
            <li><a href="#tarefas" onclick="showSection('tarefas')">Tarefas</a></li>
        </ul>
    </nav>

    <!-- Seção de Criação de Personagem -->
    <section id="create-character" class="section active">
        <h2>Criar Personagem</h2>
        <form>
            <label for="nome">Nome:</label>
            <input type="text" id="nome" required>

            <label for="forca">Força:</label>
            <input type="number" id="forca" min="1" max="20" required>

            <label for="agilidade">Agilidade:</label>
            <input type="number" id="agilidade" min="1" max="20" required>

            <label for="inteligencia">Inteligência:</label>
            <input type="number" id="inteligencia" min="1" max="20" required>

            <button type="button" onclick="createCharacter()">Criar Personagem</button>
        </form>
    </section>

    <!-- Seção de Ranking -->
    <section id="ranking" class="section hidden">
        <h2>Ranking</h2>
        <p>Em breve: sistema de classificação dos melhores jogadores!</p>
    </section>

    <!-- Seção de Equipamentos -->
    <section id="equipamentos" class="section hidden">
        <h2>Equipamentos</h2>
        <p>Em breve: gerencie e equipe seu personagem!</p>
    </section>

    <!-- Seção de Personagem Criado -->
    <section id="personagem" class="section hidden">
        <h2>Personagem Criado</h2>
        <p id="character-name">Nome:</p>
        <p id="character-level">Nível:</p>
        <p id="strength">Força:</p>
        <p id="agility">Agilidade:</p>
        <p id="intelligence">Inteligência:</p>
    </section>

    <!-- Seção de Tarefas -->
    <section id="tarefas" class="section hidden">
        <h2>Tarefas</h2>
        <div class="task-box">
            <h3>Agachamento (20 Repetições)</h3>
            <p id="agachamento-progress">Faltam 20 agachamentos</p>
            <button onclick="completeExercise('agachamento')">Completar Agachamento</button>
        </div>
        <div class="task-box">
            <h3>Flexão (20 Repetições)</h3>
            <p id="flexao-progress">Faltam 20 flexões</p>
            <button onclick="completeExercise('flexao')">Completar Flexão</button>
        </div>
        <div class="task-box">
            <h3>Abdominais (20 Repetições)</h3>
            <p id="abdominais-progress">Faltam 20 abdominais</p>
            <button onclick="completeExercise('abdominais')">Completar Abdominais</button>
        </div>
        <div class="task-box">
            <h3>Corrida (1 km)</h3>
            <p id="corrida-progress">Faltam 1 km de corrida</p>
            <button onclick="completeExercise('corrida')">Completar Corrida</button>
        </div>
    </section>

    <script src="javascript/SLA.js"></script>
</body>
</html>









