// page loader
const loader = document.getElementById('loader')

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden')
    }, 1800)
})

// navbar hamburger toggle
const menuBtn = document.getElementById('menuBtn')
const navLinks = document.getElementById('navLinks')

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open')
})

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open')
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
        item.style.color = '#9aaac4'
        if (item.getAttribute('href') === `#${current}`) {
            item.style.color = '#00c9a7'
        }
    })
})

// scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible')
        }
    })
}, { threshold: 0.1 })

document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el)
})

// scroll to top button
const scrollTopBtn = document.getElementById('scrollTop')

window.addEventListener('scroll', () => {
    if (scrollY > 400) {
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
