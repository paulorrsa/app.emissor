// Variáveis globais
let isMenuOpen = false;

// Função para alternar o menu mobile
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

// Função para scroll para seções
function scrollToSection(sectionId) {
    // Apenas fecha o menu mobile se estiver aberto
    if (isMenuOpen) {
        toggleMobileMenu();
    }
    
    // Procura o elemento alvo
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Função para lidar com o envio do formulário
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoading = submitButton.querySelector('.button-loading');
    const formMessage = document.getElementById('form-message');
    
    // Valida o formulário
    const isValid = Array.from(form.elements).every(element => {
        if (element.hasAttribute('required')) {
            return validateField(element);
        }
        return true;
    });

    if (!isValid) {
        formMessage.textContent = 'Por favor, preencha todos os campos corretamente.';
        formMessage.className = 'form-message error';
        return;
    }

    // Desabilita o botão e mostra loading
    submitButton.disabled = true;
    buttonText.style.display = 'none';
    buttonLoading.style.display = 'flex';

    // Coleta os dados do formulário
    const formData = {
        nome: form.nome.value,
        email: form.email.value,
        whatsapp: form.whatsapp.value,
        mensagem: form.mensagem.value
    };

    try {
        const response = await fetch('https://emissor.eternasoftware.com.br/api/enviar-formulario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
            formMessage.className = 'form-message success';
            form.reset();
            
            // Limpa as classes de erro dos campos
            Array.from(form.elements).forEach(element => {
                element.classList.remove('error');
                if (element.style) element.style.borderColor = '';
            });
        } else {
            throw new Error(data.message || 'Erro ao enviar mensagem');
        }
    } catch (error) {
        formMessage.textContent = error.message || 'Erro ao enviar mensagem. Por favor, tente novamente.';
        formMessage.className = 'form-message error';
    } finally {
        // Reativa o botão e esconde loading
        submitButton.disabled = false;
        buttonText.style.display = 'inline';
        buttonLoading.style.display = 'none';
    }
}

// Função para adicionar animações quando elementos entram na viewport
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observar cards e seções
    const elementsToObserve = document.querySelectorAll('.card, .section-header');
    elementsToObserve.forEach(el => observer.observe(el));
}

// Função para adicionar efeito de hover nos cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Função para adicionar efeito de scroll no header
function handleHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Função para adicionar efeitos de hover nos botões
function addButtonHoverEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Função para adicionar efeito de hover na imagem hero
function addHeroImageHover() {
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        heroImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        heroImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Função para adicionar efeitos de hover nos ícones sociais
function addSocialIconHoverEffects() {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.color = '#ffffff';
            this.style.transform = 'scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.color = '#9ca3af';
            this.style.transform = 'scale(1)';
        });
    });
}

// Função para adicionar efeito de digitação no título hero
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Iniciar efeito após um pequeno delay
    setTimeout(typeWriter, 500);
}

// Função para adicionar contador animado nos números
function addCounterAnimation() {
    const counters = document.querySelectorAll('.pricing-price .amount');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.textContent.replace('R$ ', '').replace(',', '.'));
        let current = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = `R$ ${current.toFixed(2).replace('.', ',')}`;
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = `R$ ${target.toFixed(2).replace('.', ',')}`;
            }
        };
        
        // Iniciar animação quando o elemento estiver visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Função para adicionar efeito de parallax suave
function addParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Função para adicionar validação em tempo real no formulário
function addFormValidation() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

// Função para validar campo individual
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Remover classes de erro anteriores
    field.classList.remove('error');
    
    // Validar campo obrigatório
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    // Validar email
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
        }
    }
    
    // Adicionar classe de erro se inválido
    if (!isValid) {
        field.classList.add('error');
        field.style.borderColor = '#ef4444';
    } else {
        field.style.borderColor = '#d1d5db';
    }
    
    return isValid;
}

// Função para adicionar smooth scroll para links internos
function addSmoothScrollToLinks() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Função para adicionar efeito de loading
function addLoadingEffect() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Adicionar animação de entrada para elementos
        const elements = document.querySelectorAll('.hero-text, .hero-image');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });
}

// Função para adicionar efeito de destaque nos planos
function addPricingHighlight() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Remover destaque de outros cards
            pricingCards.forEach(c => c.classList.remove('highlighted'));
            // Adicionar destaque ao card atual
            this.classList.add('highlighted');
        });
    });
    
    // Remover destaque quando sair da seção de preços
    const pricingSection = document.getElementById('planos');
    if (pricingSection) {
        pricingSection.addEventListener('mouseleave', () => {
            pricingCards.forEach(c => c.classList.remove('highlighted'));
        });
    }
}

// Função para controlar o FAQ
function toggleFAQ(element) {
    const item = element.parentElement;
    const answer = element.nextElementSibling;
    const faqId = item.getAttribute('data-faq-id');
    const isActive = item.classList.contains('active');
    
    // Fecha todos os outros itens
    document.querySelectorAll('.faq-item').forEach(faqItem => {
        const itemId = faqItem.getAttribute('data-faq-id');
        faqItem.classList.remove('active');
        faqItem.querySelector('.faq-answer').classList.remove('active');
        localStorage.removeItem(`faq-${itemId}`);
    });
    
    // Abre/fecha o item clicado
    if (!isActive) {
        item.classList.add('active');
        answer.classList.add('active');
        localStorage.setItem(`faq-${faqId}`, 'active');
        
        // Atualiza a URL com o ID do FAQ
        history.replaceState(null, null, `#faq-${faqId}`);
    } else {
        history.replaceState(null, null, '#faq');
    }
}

// Função para restaurar estado do FAQ
function restoreFAQState() {
    // Verifica se há um hash na URL
    const hash = window.location.hash;
    if (hash && hash.startsWith('#faq-')) {
        const faqId = hash.substring(5);
        const faqItem = document.querySelector(`[data-faq-id="${faqId}"]`);
        if (faqItem) {
            setTimeout(() => {
                const questionEl = faqItem.querySelector('.faq-question');
                if (questionEl) {
                    toggleFAQ(questionEl);
                }
            }, 100);
        }
    }
}

// Função principal de inicialização
function init() {
    // Forçar scroll para o topo ao carregar/recarregar a página
    window.onload = function() {
        window.scrollTo(0, 0);
    }
    
    // Adicionar event listeners
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Inicializar funcionalidades que não interferem no comportamento padrão
    addCardHoverEffects();
    handleHeaderScroll();
    addButtonHoverEffects();
    addHeroImageHover();
    addSocialIconHoverEffects();
    addFormValidation();
    addPricingHighlight();
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', init);

// Forçar scroll para o topo antes de recarregar a página
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

// Adicionar estilos CSS dinâmicos para animações
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .highlighted {
        transform: scale(1.02) !important;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15) !important;
    }
    
    .hero-text, .hero-image {
        transition: transform 0.3s ease;
    }
    
    .card {
        transition: all 0.3s ease;
    }
    
    .btn-primary, .btn-secondary {
        transition: all 0.3s ease;
    }
    
    .hero-image {
        transition: transform 0.5s ease;
    }
    
    .social-icon {
        transition: all 0.3s ease;
    }
    
    header {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

