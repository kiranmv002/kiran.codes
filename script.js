// custom cursor
const cursorDot = document.getElementById('cursorDot')
const cursorRing = document.getElementById('cursorRing')

let ringX = 0
let ringY = 0
let mouseX = 0
let mouseY = 0

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    cursorDot.style.left = mouseX + 'px'
    cursorDot.style.top = mouseY + 'px'
})

function animateRing() {
    ringX += (mouseX - ringX) * 0.12
    ringY += (mouseY - ringY) * 0.12
    cursorRing.style.left = ringX + 'px'
    cursorRing.style.top = ringY + 'px'
    requestAnimationFrame(animateRing)
}

animateRing()

const interactiveEls = document.querySelectorAll(
    'a, button, .project-card, .skill-category, .social-card, .filter-tab, .stat'
)

interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hover')
        cursorRing.classList.add('hover')
    })
    el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hover')
        cursorRing.classList.remove('hover')
    })
})

window.addEventListener('mousedown', () => {
    cursorDot.classList.add('click')
    cursorRing.classList.add('click')
})

window.addEventListener('mouseup', () => {
    cursorDot.classList.remove('click')
    cursorRing.classList.remove('click')
})

window.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0'
    cursorRing.style.opacity = '0'
})

window.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1'
    cursorRing.style.opacity = '0.6'
})

// page loader
const loader = document.getElementById('loader')

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden')
    }, 1800)
})

// mobile menu
const menuBtn = document.getElementById('menuBtn')
const mobileMenu = document.getElementById('mobileMenu')
const mobileClose = document.getElementById('mobileClose')

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('open')
    document.body.style.overflow = 'hidden'
})

mobileClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open')
    document.body.style.overflow = ''
})

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open')
        document.body.style.overflow = ''
    })
})

// active nav link on scroll
const sections = document.querySelectorAll('section')
const navItems = document.querySelectorAll('nav ul a')

window.addEventListener('scroll', () => {
    let current = ''
    sections.forEach(section => {
        const sectionTop = section.offsetTop
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id')
        }
    })
    navItems.forEach(item => {
        item.classList.remove('active')
        item.style.color = ''
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active')
        }
    })
})

// scroll animations — all animation types
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible')
        }
    })
}, { threshold: 0.1 })

document.querySelectorAll(
    '.fade-up, .fade-left, .fade-right, .fade-in, .zoom-in'
).forEach(el => {
    observer.observe(el)
})

// scroll to top progress ring
const scrollTopBtn = document.getElementById('scrollTop')
const progressCircle = document.getElementById('progressCircle')
const circumference = 2 * Math.PI * 18

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = scrollTop / docHeight
    const offset = circumference - (scrollPercent * circumference)

    progressCircle.style.strokeDashoffset = offset

    if (scrollTop > 400) {
        scrollTopBtn.classList.add('show')
    } else {
        scrollTopBtn.classList.remove('show')
    }
})

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

// typing animation
const tagline = document.getElementById('tagline')
const texts = [
    'B.Tech CSE student who loves building things.',
    'learning MERN stack one day at a time.',
    'pushing code to github every single day.',
]

let textIndex = 0
let charIndex = 0
let isDeleting = false

const cursor = document.createElement('span')
cursor.className = 'cursor'
tagline.appendChild(cursor)

function type() {
    const current = texts[textIndex]

    if (isDeleting) {
        tagline.textContent = current.substring(0, charIndex - 1)
        charIndex--
    } else {
        tagline.textContent = current.substring(0, charIndex + 1)
        charIndex++
    }

    tagline.appendChild(cursor)

    if (!isDeleting && charIndex === current.length) {
        setTimeout(() => isDeleting = true, 1800)
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % texts.length
    }

    setTimeout(type, isDeleting ? 40 : 70)
}

setTimeout(type, 1200)

// dark light mode toggle
const themeBtn = document.getElementById('themeBtn')

const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'light') {
    document.body.classList.add('light')
    themeBtn.textContent = '☀️'
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light')
    if (document.body.classList.contains('light')) {
        themeBtn.textContent = '☀️'
        localStorage.setItem('theme', 'light')
    } else {
        themeBtn.textContent = '🌙'
        localStorage.setItem('theme', 'dark')
    }
})

// contact form
const contactForm = document.getElementById('contactForm')
const formStatus = document.getElementById('formStatus')
const submitBtn = document.getElementById('submitBtn')

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        submitBtn.textContent = 'sending...'
        submitBtn.disabled = true

        const formData = new FormData(contactForm)

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })

            if (response.ok) {
                formStatus.textContent = '✅ message sent! i will reply soon.'
                formStatus.style.color = '#00c9a7'
                contactForm.reset()
            } else {
                formStatus.textContent = '❌ something went wrong. email me directly.'
                formStatus.style.color = '#ff6b6b'
            }
        } catch {
            formStatus.textContent = '❌ something went wrong. email me directly.'
            formStatus.style.color = '#ff6b6b'
        }

        submitBtn.textContent = 'send message 🚀'
        submitBtn.disabled = false
    })
}

// project filter tabs
const filterTabs = document.querySelectorAll('.filter-tab')
const projectCards = document.querySelectorAll('.project-card')

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'))
        tab.classList.add('active')

        const filter = tab.getAttribute('data-filter')

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category')
            if (filter === 'all' || category === filter || category === 'all') {
                card.classList.remove('hidden')
            } else {
                card.classList.add('hidden')
            }
        })
    })
})

// project modal
const modalOverlay = document.getElementById('modalOverlay')
const modalClose = document.getElementById('modalClose')
const modalContent = document.getElementById('modalContent')

document.querySelectorAll('.project-card:not(.building)').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.getAttribute('data-title')
        const icon = card.getAttribute('data-icon')
        const desc = card.getAttribute('data-desc')
        const tech = card.getAttribute('data-tech')
        const link = card.getAttribute('data-link')
        const status = card.getAttribute('data-status')

        if (!title) return

        const techTags = tech.split(',').map(t =>
            `<span>${t.trim()}</span>`
        ).join('')

        const statusLabel = status === 'active' ? 'actively maintained' : 'completed'

        modalContent.innerHTML = `
            <div class="modal-icon">${icon}</div>
            <h2 class="modal-title">${title}</h2>
            <p class="modal-desc">${desc}</p>
            <div class="modal-tech">${techTags}</div>
            <div class="modal-status ${status}">
                <div class="dot"></div>
                <span>${statusLabel}</span>
            </div>
            <a href="${link}" target="_blank" class="modal-btn">
                view on GitHub →
            </a>
        `

        modalOverlay.classList.add('open')
        document.body.style.overflow = 'hidden'
    })
})

function closeModal() {
    modalOverlay.classList.remove('open')
    document.body.style.overflow = ''
}

modalClose.addEventListener('click', closeModal)

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal()
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal()
})

// github activity — fetch live stats and repos
async function loadGithubStats() {
    try {
        const [userRes, reposRes] = await Promise.all([
            fetch('https://api.github.com/users/kiranmv002'),
            fetch('https://api.github.com/users/kiranmv002/repos?sort=updated&per_page=6')
        ])

        if (!userRes.ok || !reposRes.ok) return

        const user = await userRes.json()
        const repos = await reposRes.json()

        // update stats
        document.getElementById('ghRepos').textContent = user.public_repos
        document.getElementById('ghFollowers').textContent = user.followers

        // count total stars
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
        document.getElementById('ghStars').textContent = totalStars

        // render repos
        const grid = document.getElementById('ghReposGrid')
        grid.innerHTML = repos.slice(0, 6).map(repo => `
            <a href="${repo.html_url}" target="_blank" class="gh-repo-card">
                <div class="gh-repo-name">📁 ${repo.name}</div>
                <div class="gh-repo-desc">${repo.description || 'no description'}</div>
                <div class="gh-repo-meta">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                    ${repo.language ? `<span>🔵 ${repo.language}</span>` : ''}
                </div>
            </a>
        `).join('')

    } catch (error) {
        console.error('failed to load github stats:', error)
        document.getElementById('ghReposGrid').innerHTML =
            '<div class="gh-loading">failed to load repos</div>'
    }
}

loadGithubStats()

// testimonials carousel
const track = document.getElementById('testimonialsTrack')
const dotsContainer = document.getElementById('testimonialDots')
const prevBtn = document.getElementById('testimonialPrev')
const nextBtn = document.getElementById('testimonialNext')

if (track) {
    const cards = track.querySelectorAll('.testimonial-card')
    let current = 0
    let autoPlay

    // create dots
    cards.forEach((_, i) => {
        const dot = document.createElement('button')
        dot.className = i === 0 ? 'testimonial-dot active' : 'testimonial-dot'
        dot.addEventListener('click', () => goTo(i))
        dotsContainer.appendChild(dot)
    })

    function goTo(index) {
        current = (index + cards.length) % cards.length
        track.style.transform = `translateX(-${current * 100}%)`
        document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
            dot.className = i === current ? 'testimonial-dot active' : 'testimonial-dot'
        })
    }

    function next() { goTo(current + 1) }
    function prev() { goTo(current - 1) }

    nextBtn.addEventListener('click', () => {
        next()
        resetAutoPlay()
    })

    prevBtn.addEventListener('click', () => {
        prev()
        resetAutoPlay()
    })

    function startAutoPlay() {
        autoPlay = setInterval(next, 4000)
    }

    function resetAutoPlay() {
        clearInterval(autoPlay)
        startAutoPlay()
    }

    // pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoPlay))
    track.addEventListener('mouseleave', startAutoPlay)

    startAutoPlay()
}
