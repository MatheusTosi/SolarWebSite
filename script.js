// script.js

// Função assíncrona para carregar os dados do arquivo JSON
async function loadData() {
    try {
        const response = await fetch('data.json'); // Faz uma requisição para o arquivo data.json
        if (!response.ok) { // Verifica se a resposta da requisição foi bem-sucedida
            throw new Error(`HTTP error! status: ${response.status}`); // Lança um erro se a resposta não for ok
        }
        const data = await response.json(); // Converte a resposta para JSON
        return data; // Retorna os dados carregados
    } catch (error) {
        console.error('Erro ao carregar os dados:', error); // Exibe um erro no console se houver falha ao carregar
        return null; // Retorna nulo em caso de erro
    }
}

// Função para popular o conteúdo da página com os dados carregados
async function populatePage() {
    const data = await loadData(); // Carrega os dados do JSON
    if (!data) return; // Sai da função se os dados não foram carregados

    // Seleciona o elemento main-content para onde o conteúdo será injetado
    const mainContent = document.getElementById('main-content');
    if (!mainContent) {
        console.warn('Elemento #main-content não encontrado. Certifique-se de que a página HTML possui este ID.');
        return;
    }

    // Pega o nome do arquivo HTML atual para determinar qual conteúdo carregar
    const currentPage = window.location.pathname.split('/').pop();

    // Carrega o nome da empresa e o slogan em todos os lugares onde forem usados
    document.querySelectorAll('.company-name').forEach(el => el.textContent = data.companyName);
    document.querySelectorAll('.slogan').forEach(el => el.textContent = data.slogan);

    // Renderiza o conteúdo específico para cada página
    switch (currentPage) {
        case 'index.html':
        case '': // Para o caso de ser a raiz do site (e.g., / ou /index.html)
            renderHomePage(mainContent, data);
            break;
        case 'sobre.html':
            renderAboutPage(mainContent, data);
            break;
        case 'servicos.html':
            renderServicesPage(mainContent, data);
            break;
        case 'faleconosco.html':
            renderContactPage(mainContent, data);
            break;
        case 'equipe.html':
            renderDeveloperPage(mainContent, data);
            break;
        default:
            console.warn(`Página desconhecida: ${currentPage}`); // Loga um aviso para páginas não tratadas
            break;
    }
}

// === Funções de Renderização de Páginas ===

function renderHomePage(container, data) {
    container.innerHTML = `
        <!-- Seção Principal (Hero) -->
        <section class="relative h-screen bg-cover bg-center flex items-center justify-center text-center p-4 rounded-lg"
            style="background-image: url('https://placehold.co/1920x1080/4CAF50/FFFFFF?text=Jardins+Exuberantes');">
            <div class="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
            <div class="relative z-10 text-white max-w-3xl rounded-lg bg-black bg-opacity-40 p-8 shadow-xl">
                <h1 class="text-5xl font-extrabold leading-tight mb-4 animate-fadeIn">${data.heroSection.title}</h1>
                <p class="text-xl mb-8">${data.heroSection.subtitle}</p>
                <a href="servicos.html" class="btn-primary">Conheça Nossos Serviços</a>
            </div>
        </section>

        <!-- Seção Sobre a Empresa -->
        <section id="sobre" class="py-16 bg-white rounded-lg shadow-md mx-auto my-12 max-w-6xl p-8">
            <div class="container mx-auto text-center">
                <h2 class="section-title">${data.aboutCompany.title}</h2>
                <div class="flex flex-col md:flex-row items-center justify-center md:space-x-8">
                    <div class="md:w-1/2 mb-6 md:mb-0">
                        <img src="https://placehold.co/600x400/8BC34A/FFFFFF?text=Equipe+Solar+Paisagismo" alt="${data.aboutCompany.imageAlt}" class="rounded-lg shadow-lg w-full h-auto object-cover">
                    </div>
                    <div class="md:w-1/2 text-left">
                        ${data.aboutCompany.paragraphs.map(p => `<p class="text-lg leading-relaxed text-gray-700 mb-4">${p}</p>`).join('')}
                    </div>
                </div>
            </div>
        </section>

        <!-- Seção de Serviços -->
        <section id="servicos" class="py-16 bg-gray-100 rounded-lg shadow-md mx-auto my-12 max-w-6xl p-8">
            <div class="container mx-auto text-center">
                <h2 class="section-title">${data.services.title}</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${data.services.items.map(service => `
                        <div class="card text-center">
                            <div class="text-5xl text-green-600 mb-4">${service.icon}</div>
                            <h3 class="text-2xl font-semibold mb-3">${service.name}</h3>
                            <p class="text-gray-700">${service.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Seção de Portfólio -->
        <section id="portfolio" class="py-16 bg-white rounded-lg shadow-md mx-auto my-12 max-w-6xl p-8">
            <div class="container mx-auto text-center">
                <h2 class="section-title">${data.portfolio.title}</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${data.portfolio.items.map(item => `
                        <div class="rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                            <img src="https://placehold.co/600x400/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${encodeURIComponent(item.name).replace(/%20/g, '+')}" alt="${item.imageAlt}" class="w-full h-56 object-cover">
                            <div class="p-4 bg-white">
                                <h3 class="text-xl font-semibold mb-2">${item.name}</h3>
                                <p class="text-gray-700">${item.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Seção de Contato Rápido (Call to Action) -->
        <section class="py-16 bg-green-700 text-white rounded-lg shadow-md mx-auto my-12 max-w-6xl p-8 text-center">
            <h2 class="text-4xl font-bold mb-8">Interessado em Nossos Serviços?</h2>
            <p class="text-xl mb-8">Entre em contato e solicite um orçamento sem compromisso.</p>
            <a href="faleconosco.html" class="btn-primary bg-white text-green-700 hover:bg-gray-200">Fale Conosco Agora!</a>
        </section>
    `;
}

function renderAboutPage(container, data) {
    container.innerHTML = `
        <section class="py-16 bg-white rounded-lg shadow-md mx-auto my-12 max-w-6xl p-8">
            <div class="container mx-auto text-center">
                <h2 class="section-title">${data.aboutCompany.title}</h2>
                <div class="flex flex-col md:flex-row items-center justify-center md:space-x-8">
                    <div class="md:w-1/2 mb-6 md:mb-0">
                        <img src="https://placehold.co/600x400/A5D6A7/FFFFFF?text=Jardim+Exemplar" alt="${data.aboutCompany.imageAlt}" class="rounded-lg shadow-lg w-full h-auto object-cover">
                    </div>
                    <div class="md:w-1/2 text-left">
                        ${data.aboutCompany.paragraphs.map(p => `<p class="text-lg leading-relaxed text-gray-700 mb-4">${p}</p>`).join('')}
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderServicesPage(container, data) {
    container.innerHTML = `
        <section class="py-16 bg-gray-100 rounded-lg shadow-md mx-auto my-12 max-w-6xl p-8">
            <div class="container mx-auto text-center">
                <h2 class="section-title">${data.services.title}</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${data.services.items.map(service => `
                        <div class="card text-center">
                            <div class="text-5xl text-green-600 mb-4">${service.icon}</div>
                            <h3 class="text-2xl font-semibold mb-3">${service.name}</h3>
                            <p class="text-gray-700">${service.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

function renderContactPage(container, data) {
    container.innerHTML = `
        <section class="py-16 bg-green-700 text-white rounded-lg shadow-md mx-auto my-12 max-w-6xl p-8">
            <div class="container mx-auto text-center">
                <h2 class="text-4xl font-bold mb-8">Fale Conosco</h2>
                <p class="text-xl mb-8">Entre em contato para solicitar um orçamento ou tirar suas dúvidas.</p>
                <div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
                    <p class="text-lg">📧 E-mail: <a href="mailto:${data.contactInfo.email}" class="hover:underline">${data.contactInfo.email}</a></p>
                    <p class="text-lg">📞 Telefone: <a href="tel:${data.contactInfo.phone.replace(/\D/g,'')}" class="hover:underline">${data.contactInfo.phone}</a></p>
                    <p class="text-lg">📱 WhatsApp: <a href="https://wa.me/55${data.contactInfo.whatsapp.replace(/\D/g,'')}" target="_blank" class="hover:underline">${data.contactInfo.whatsapp}</a></p>
                </div>
                <p class="text-lg mb-8">📍 Endereço: ${data.contactInfo.address}</p>

                <div class="mt-8">
                    <h3 class="text-2xl font-semibold mb-4">Envie uma Mensagem</h3>
                    <form class="max-w-xl mx-auto space-y-4 contact-form">
                        <input type="text" placeholder="Seu Nome" required>
                        <input type="email" placeholder="Seu E-mail" required>
                        <input type="tel" placeholder="Seu Telefone (Opcional)">
                        <textarea placeholder="Sua Mensagem" rows="5" required></textarea>
                        <button type="submit" class="btn-primary">
                            Enviar Mensagem
                        </button>
                    </form>
                </div>
            </div>
        </section>
    `;
}

function renderDeveloperPage(container, data) {
    container.innerHTML = `
        <section class="py-16 bg-white rounded-lg shadow-md mx-auto my-12 max-w-6xl p-8">
            <div class="container mx-auto text-center">
                <h2 class="section-title">${data.aboutDeveloper.title}</h2>
                <div class="md:w-full text-left">
                    ${data.aboutDeveloper.paragraphs.map(p => `<p class="text-lg leading-relaxed text-gray-700 mb-4">${p}</p>`).join('')}
                </div>
            </div>
        </section>
    `;
}

// Adiciona um listener para quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', populatePage);
