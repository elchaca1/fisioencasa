'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import {
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle,
  Star,
  MapPin,
  Clock,
  Award,
  Users,
  Heart,
  Activity,
  Home,
  ArrowRight,
  Menu,
  Stethoscope,
  Bone,
  MonitorSmartphone,
  Dumbbell,
  ChevronRight,
  Send,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'

const WHATSAPP_NUMBER = '51954670730'
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`

/* ─────────── Logo Component ─────────── */
function FisioHomeLogo({ className = 'size-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* House outline */}
      <path d="M16 4L3 14h3v12h8v-8h4v8h8V14h3L16 4z" fill="currentColor" opacity="0.3" />
      <path d="M16 4L3 14h3v12h8v-8h4v8h8V14h3L16 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Spine / body line inside house */}
      <path d="M16 14v2m0 2v2m0 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Small cross/plus for health */}
      <circle cx="16" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

function openWhatsApp(message: string) {
  window.open(`${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`, '_blank')
}

/* ─────────── Scroll Animation Wrapper ─────────── */
function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─────────── Navigation Links ─────────── */
const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-mi', label: 'Sobre Mí' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#como-funciona', label: 'Cómo Funciona' },
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#contacto', label: 'Contacto' },
]

/* ═══════════════════════════════════════════════════
   1. HEADER / NAVIGATION
   ═══════════════════════════════════════════════════ */
function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  function handleNavClick() {
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
            <FisioHomeLogo className="size-5 text-white" />
          </div>
          <span className="text-lg sm:text-xl font-bold text-primary">FisioEnCasa</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            onClick={() => openWhatsApp('Hola, me gustaría agendar una cita')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </Button>
          <a href="#contacto">
            <Button>
              <Calendar className="size-4" />
              Agenda tu Cita
            </Button>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menú">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                  <FisioHomeLogo className="size-4 text-white" />
                </div>
                <span className="text-lg font-bold text-primary">FisioEnCasa</span>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4 pt-4" aria-label="Navegación móvil">
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleNavClick}
                    className="flex items-center gap-2 rounded-md px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary"
                  >
                    <ChevronRight className="size-4 text-muted-foreground" />
                    {link.label}
                  </a>
                </SheetClose>
              ))}
            </nav>
            <div className="flex flex-col gap-3 px-4 pt-6">
              <SheetClose asChild>
                <Button
                  onClick={() => {
                    handleNavClick()
                    openWhatsApp('Hola, me gustaría agendar una cita')
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <a href="#contacto" onClick={handleNavClick}>
                  <Button className="w-full">
                    <Calendar className="size-4" />
                    Agenda tu Cita
                  </Button>
                </a>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

/* ═══════════════════════════════════════════════════
   2. HERO SECTION
   ═══════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white">
      {/* Animated decorative background */}
      <div className="absolute inset-0">
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        {/* Floating gradient orbs */}
        <div className="absolute top-10 left-10 size-72 rounded-full bg-white/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-20 size-96 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 size-[400px] rounded-full bg-yellow-400/5 blur-3xl" />
        {/* Diagonal accent line */}
        <div className="absolute -top-20 -right-20 h-[600px] w-[600px] rounded-full border border-white/5" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full border border-white/5" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — Text content */}
          <div>
            {/* Urgency badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 border-yellow-400 bg-yellow-400/20 text-yellow-100 text-sm px-4 py-1.5 hover:bg-yellow-400/30">
                🔥 Las primeras 10 citas del mes tienen 20% de descuento
              </Badge>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-[3.5rem]"
            >
              ¿Dolor de espalda? El fisioterapeuta{' '}
              <span className="text-yellow-300">va a tu casa en Lima</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-blue-100 sm:text-xl"
            >
              Fisioterapeuta profesional que llega a la puerta de tu casa en Lima. Olvídate de traslados,
              esperas y molestias — recibe tu tratamiento en la comodidad de tu hogar con equipamiento completo.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <a href="#contacto">
                <Button size="lg" className="w-full bg-white text-primary hover:bg-blue-50 font-semibold text-base px-8 h-13 sm:w-auto shadow-lg shadow-white/20">
                  <Calendar className="size-5 mr-1" />
                  Agenda tu Cita
                </Button>
              </a>
              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-base px-8 h-13 sm:w-auto shadow-lg shadow-green-600/20"
                onClick={() => openWhatsApp('Hola, me gustaría agendar una cita de fisioterapia a domicilio')}
              >
                <MessageCircle className="size-5 mr-1" />
                Escríbeme por WhatsApp
              </Button>
            </motion.div>

            {/* Trust indicators — compact row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
            >
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-white/10">
                  <Award className="size-4 text-yellow-300" />
                </div>
                <span className="text-sm font-medium text-blue-100">+10 años a domicilio</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-white/10">
                  <Home className="size-4 text-yellow-300" />
                </div>
                <span className="text-sm font-medium text-blue-100">Terapia en tu hogar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-white/10">
                  <CheckCircle className="size-4 text-yellow-300" />
                </div>
                <span className="text-sm font-medium text-blue-100">Colegiado y habilitado</span>
              </div>
            </motion.div>
          </div>

          {/* Right — Hero image with decorative elements */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main image container */}
            <div className="relative">
              {/* Decorative frame background */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10" />

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero-fisio-v4.png"
                  alt="Fisioterapeuta atendiendo a una paciente a domicilio en Lima"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
                {/* Gradient overlay on image bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
              </div>

              {/* Floating card — rating */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-4 -left-4 rounded-xl bg-white p-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-foreground">4.9</span>
                  <span className="text-xs text-muted-foreground">/ 5</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">+2,000 pacientes satisfechos</p>
              </motion.div>

              {/* Floating card — home visit */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="absolute -top-4 -right-4 rounded-xl bg-green-600 px-4 py-3 shadow-xl text-white"
              >
                <div className="flex items-center gap-2">
                  <Home className="size-5" />
                  <div>
                    <p className="text-sm font-bold">Atención a Domicilio</p>
                    <p className="text-xs text-green-100">En toda Lima</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   3. SOBRE MÍ (ABOUT ME)
   ═══════════════════════════════════════════════════ */
function AboutSection() {
  const stats = [
    { icon: Award, value: '10+', label: 'Años de experiencia' },
    { icon: Users, value: '2,000+', label: 'Pacientes atendidos' },
    { icon: CheckCircle, value: '5', label: 'Certificaciones' },
    { icon: Star, value: '4.9', label: 'Calificación promedio' },
  ]

  return (
    <section id="sobre-mi" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left — Avatar + visual */}
          <AnimatedSection>
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/foto-perfil.png"
                  alt="Fisioterapeuta FisioEnCasa — Foto de perfil profesional"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-2 sm:right-4 rounded-xl bg-white p-3 sm:p-4 shadow-lg border">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex size-8 sm:size-10 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="size-4 sm:size-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold">Colegiado CPP</p>
                    <p className="text-xs text-muted-foreground">Habilitado 2025</p>
                  </div>
                </div>
              </div>
              {/* Floating home badge */}
              <div className="absolute top-4 -left-2 sm:left-4 rounded-xl bg-white p-3 sm:p-4 shadow-lg border">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex size-8 sm:size-10 items-center justify-center rounded-full bg-blue-100">
                    <Home className="size-4 sm:size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold">A domicilio</p>
                    <p className="text-xs text-muted-foreground">En toda Lima</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right — Content */}
          <AnimatedSection delay={0.2}>
            <Badge variant="secondary" className="mb-4">Sobre Mí</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Tu fisioterapeuta a domicilio en Lima
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Soy fisioterapeuta colegado con más de 10 años de experiencia llevando
              rehabilitación profesional directamente a tu hogar. Mi especialidad es la
              terapia a domicilio: llego a tu casa con todo el equipamiento necesario para
              que recuperes tu movilidad sin la molestia de trasladarte a una clínica.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              He atendido a más de 2,000 pacientes en Lima, desde profesionales con dolor
              por trabajo en oficina hasta deportistas en recuperación. Cada tratamiento es
              único porque cada persona lo es — y hacerlo en tu casa hace que la recuperación
              sea más cómoda, rápida y efectiva.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Especialista en rehabilitación a domicilio',
                'Certificado en terapia manual ortopédica',
                'Formación en salud ocupacional y ergonomía',
                'Equipamiento completo para atención en casa',
                'Cobertura en todos los distritos de Lima',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>

        {/* Stats row */}
        <AnimatedSection delay={0.3} className="mt-16">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center border-none shadow-md">
                <CardContent className="pt-6 pb-6 flex flex-col items-center gap-2">
                  <stat.icon className="size-8 text-primary" />
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   4. SERVICIOS (SERVICES)
   ═══════════════════════════════════════════════════ */
function ServicesSection() {
  const services = [
    {
      icon: Home,
      title: 'Fisioterapia a Domicilio',
      description:
        'Tu tratamiento profesional sin salir de casa. Llego a tu hogar con todo el equipamiento necesario: camilla portátil, electroestimulación, bandas terapéuticas y más. Sin traslados, sin esperas.',
      benefits: [
        'Sin trasladarte a una clínica',
        'Equipamiento completo en tu casa',
        'Horarios flexibles que se adaptan a ti',
        'Atención en todos los distritos de Lima',
      ],
    },
    {
      icon: Bone,
      title: 'Dolor Lumbar a Domicilio',
      description:
        'Elimina el dolor que limita tu día a día sin moverte de casa. Con técnicas manuales y ejercicios terapéuticos, reducimos la inflamación y devolvemos la movilidad a tu espalda baja.',
      benefits: [
        'Reducción del dolor desde la primera sesión',
        'Mejora en la movilidad y flexibilidad',
        'Plan de ejercicios para hacer en casa',
      ],
    },
    {
      icon: Activity,
      title: 'Corrección Postural en Casa',
      description:
        'Reeducamos tu postura en tu propio entorno. Evaluamos tu puesto de trabajo real en casa u oficina, y diseñamos un plan de corrección adaptado a tu espacio y rutina.',
      benefits: [
        'Evaluación de ergonomía en tu espacio real',
        'Reduce dolores de cuello y espalda',
        'Técnicas que aplicas en tu día a día',
      ],
    },
    {
      icon: Dumbbell,
      title: 'Rehabilitación Deportiva a Casa',
      description:
        'Vuelve a tu deporte más fuerte que antes. Tratamiento integral para lesiones deportivas que se realiza en la comodidad de tu hogar, con seguimiento personalizado constante.',
      benefits: [
        'Recuperación acelerada de lesiones',
        'Fortalecimiento preventivo personalizado',
        'Plan de retorno seguro al deporte',
      ],
    },
  ]

  return (
    <section id="servicios" className="py-16 sm:py-24 bg-blue-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center">
          <Badge variant="secondary" className="mb-4">Servicios</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Fisioterapia a domicilio: todos los tratamientos en tu casa
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
            Cada tratamiento se realiza en la comodidad de tu hogar. Llego con equipamiento completo
            y un enfoque personalizado para que recuperes tu salud sin salir de casa.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.1}>
              <Card className="h-full transition-shadow hover:shadow-lg border-none shadow-md">
                <CardHeader>
                  <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                    <service.icon className="size-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg mt-2">{service.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-4" />
                  <ul className="space-y-2">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-600" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   5. PROBLEMAS QUE TRATO (PROBLEMS TREATED)
   ═══════════════════════════════════════════════════ */
function ProblemsSection() {
  const problems = [
    {
      icon: Bone,
      title: 'Dolor Lumbar',
      description: 'Agudo o crónico, tratamos la causa raíz del dolor en tu espalda baja.',
    },
    {
      icon: Activity,
      title: 'Hernias Discales',
      description: 'Rehabilitación conservadora para evitar o postergar la cirugía.',
    },
    {
      icon: MonitorSmartphone,
      title: 'Mala Postura',
      description: 'Corrección de la alineación corporal por hábitos cotidianos.',
    },
    {
      icon: Clock,
      title: 'Dolor por Trabajo en Oficina',
      description: 'Alivio del dolor causado por horas frente al computador.',
    },
    {
      icon: Dumbbell,
      title: 'Lesiones Deportivas',
      description: 'Esguinces, distensiones y recuperaciones post-quirúrgicas.',
    },
    {
      icon: Heart,
      title: 'Dolor Cervical',
      description: 'Tratamiento para tortícolis, cervicobraquialgia y tensión cervical.',
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center">
          <Badge variant="secondary" className="mb-4">Problemas que Trato</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            ¿Sufres de alguno de estos problemas?
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
            No estás solo. Estos son los problemas más comunes que trato cada día a domicilio.
            La fisioterapia en tu casa puede ayudarte a superarlos sin salir de tu hogar.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, i) => (
            <AnimatedSection key={problem.title} delay={i * 0.08}>
              <div className="group flex items-start gap-4 rounded-xl border bg-white p-5 transition-all hover:border-primary/30 hover:shadow-md">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <problem.icon className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{problem.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   6. CÓMO FUNCIONA (HOW IT WORKS)
   ═══════════════════════════════════════════════════ */
function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: Stethoscope,
      title: 'Evaluación',
      description:
        'Agendamos una visita a tu hogar donde realizo una evaluación completa de tu condición física, postura y movilidad para entender la causa raíz de tu problema. Llego con todo el equipamiento necesario.',
    },
    {
      number: '02',
      icon: Heart,
      title: 'Tratamiento Personalizado',
      description:
        'Diseño un plan de tratamiento exclusivo para ti, combinando terapia manual, ejercicios terapéuticos y técnicas especializadas. Todo se realiza en la comodidad de tu hogar con equipamiento profesional.',
    },
    {
      number: '03',
      icon: CheckCircle,
      title: 'Seguimiento',
      description:
        'Monitoreo continuo de tu progreso en cada visita a domicilio, ajustando el tratamiento según tu evolución. También puedes consultarme por WhatsApp entre sesiones.',
    },
  ]

  return (
    <section id="como-funciona" className="py-16 sm:py-24 bg-gradient-to-br from-primary to-blue-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center">
          <Badge className="mb-4 border-white/30 bg-white/10 text-white hover:bg-white/20">
            Cómo Funciona
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Recupera tu salud en tu propia casa en 3 pasos
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-blue-200">
            Un proceso claro y transparente: desde que me contactas hasta que llego a tu casa
            con todo el equipamiento necesario para tu tratamiento.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.15}>
              <div className="relative flex flex-col items-center text-center">
                {/* Connector line (not on last) */}
                {i < steps.length - 1 && (
                  <div className="absolute top-12 left-[calc(50%+48px)] hidden h-0.5 w-[calc(100%-96px)] bg-white/20 md:block" />
                )}
                <div className="relative flex size-24 items-center justify-center rounded-full border-2 border-white/30 bg-white/10">
                  <step.icon className="size-10 text-white" />
                  <span className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-primary">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-blue-200 max-w-sm">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5} className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-blue-50 font-semibold text-base px-8 h-12"
            onClick={() => openWhatsApp('Hola, quiero empezar con la evaluación de fisioterapia a domicilio')}
          >
            Comenzar Ahora
            <ArrowRight className="size-5 ml-1" />
          </Button>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   7. TESTIMONIOS (TESTIMONIALS)
   ═══════════════════════════════════════════════════ */
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'María García',
      age: 42,
      condition: 'Dolor lumbar crónico',
      quote:
        'Después de meses con dolor lumbar que no me dejaba ni dormir, el tratamiento a domicilio fue mi salvación. No tenía que trasladarme y en la primera semana ya sentía mejoría. Ahora puedo jugar con mis hijos sin dolor. ¡Ir a la clínica era un suplicio, tener al fisio en casa lo cambió todo!',
      rating: 5,
    },
    {
      name: 'Carlos Mendoza',
      age: 35,
      condition: 'Hernia discal',
      quote:
        'Me diagnosticaron una hernia discal y pensé que solo la cirugía me salvaría. Gracias al tratamiento conservador y personalizado en mi casa, evité la operación y volví a mi rutina normal. La comodidad de no salir de casa fue clave para ser constante con las sesiones.',
      rating: 5,
    },
    {
      name: 'Lucía Fernández',
      age: 28,
      condition: 'Lesión deportiva',
      quote:
        'Me lesione la rodilla jugando fútbol y estaba desesperada por volver a jugar. Que el fisioterapeuta venga a casa fue lo mejor — ahorraba tiempo y podía hacer las sesiones sin interrumpir mi rutina. Volví más fuerte que antes.',
      rating: 5,
    },
    {
      name: 'Roberto Sánchez',
      age: 55,
      condition: 'Dolor por trabajo en oficina',
      quote:
        'Llevaba años con dolores de cuello y espalda por estar tantas horas sentado. Lo genial fue que evaluó mi puesto de trabajo en casa y me enseñó ejercicios que hago en mi propia silla. Ya no necesito analgésicos.',
      rating: 4,
    },
  ]

  return (
    <section id="testimonios" className="py-16 sm:py-24 bg-blue-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center">
          <Badge variant="secondary" className="mb-4">Testimonios</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Lo que dicen mis pacientes
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
            Historias reales de personas que recuperaron su calidad de vida
            con fisioterapia a domicilio.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <Card className="h-full border-none shadow-md">
                <CardContent className="pt-6">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`size-4 ${
                          idx < t.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-muted text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  {/* Quote */}
                  <blockquote className="text-sm leading-relaxed text-muted-foreground italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <Separator className="my-4" />
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-bold text-primary">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}, {t.age} años</p>
                      <p className="text-xs text-muted-foreground">{t.condition}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   8. LLAMADO A LA ACCIÓN (STRONG CTA)
   ═══════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-blue-700 p-8 sm:p-12 lg:p-16 text-white text-center">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 size-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 size-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />

            <div className="relative">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                No dejes que el dolor limite tu vida — recibe fisioterapia en casa
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-lg text-blue-100 leading-relaxed">
                Cada día que esperas, tu condición puede empeorar. Un fisioterapeuta profesional
                va a tu casa con todo el equipamiento. Agenda hoy y da el primer paso hacia
                una vida sin dolor, sin salir de tu hogar.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-yellow-300">
                <Clock className="size-5" />
                <span className="text-sm font-medium">
                  Cupos limitados — solo 10 citas con descuento este mes
                </span>
              </div>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold text-base px-8 h-12 w-full sm:w-auto"
                  onClick={() => openWhatsApp('Hola, quiero agendar una cita con el descuento del 20%')}
                >
                  <MessageCircle className="size-5 mr-1" />
                  Escríbeme por WhatsApp
                </Button>
                <a href="#contacto">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-blue-50 font-semibold text-base px-8 h-12 w-full sm:w-auto"
                  >
                    <Calendar className="size-5 mr-1" />
                    Agenda tu Cita
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   9. SISTEMA DE CITAS (APPOINTMENT BOOKING)
   ═══════════════════════════════════════════════════ */
function AppointmentSection() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    service: '',
    message: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const msg = `Hola, me gustaría agendar una cita:
📌 Nombre: ${form.name}
📞 Teléfono: ${form.phone}
📧 Email: ${form.email}
📅 Fecha preferida: ${form.date}
🏥 Servicio: ${form.service}
💬 Mensaje: ${form.message}`
    openWhatsApp(msg)
  }

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-blue-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center">
          <Badge variant="secondary" className="mb-4">Agenda tu Cita</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Empieza tu recuperación hoy
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
            Completa el formulario y te contactaremos para confirmar tu cita.
            También puedes escribirnos directamente por WhatsApp.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Card className="mx-auto mt-12 max-w-2xl border-none shadow-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      placeholder="Ej: María García"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono / Celular *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Ej: 954 670 730"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Ej: maria@correo.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha preferida</Label>
                    <Input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Tipo de servicio *</Label>
                  <Select
                    value={form.service}
                    onValueChange={(val) => setForm({ ...form, service: val })}
                    required
                  >
                    <SelectTrigger id="service" className="w-full">
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dolor-lumbar">Tratamiento de Dolor Lumbar</SelectItem>
                      <SelectItem value="correccion-postural">Corrección Postural</SelectItem>
                      <SelectItem value="rehabilitacion-deportiva">Rehabilitación Deportiva</SelectItem>
                      <SelectItem value="terapia-domicilio">Terapia a Domicilio</SelectItem>
                      <SelectItem value="hernia-discar">Tratamiento de Hernia Discal</SelectItem>
                      <SelectItem value="dolor-cervical">Tratamiento de Dolor Cervical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Cuéntanos sobre tu problema</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe brevemente tu condición o consulta..."
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="submit" size="lg" className="flex-1 h-12 text-base font-semibold">
                    <Send className="size-4 mr-1" />
                    Enviar por WhatsApp
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    className="flex-1 h-12 text-base"
                    onClick={() =>
                      openWhatsApp('Hola, me gustaría agendar una cita de fisioterapia a domicilio')
                    }
                  >
                    <MessageCircle className="size-4 mr-1 text-green-600" />
                    Escribir directamente
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  Al enviar, serás redirigido a WhatsApp con tu información pre-llenada.
                  Tus datos son confidenciales.
                </p>
              </form>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   10. FOOTER
   ═══════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
                <FisioHomeLogo className="size-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">FisioEnCasa</span>
            </div>
            <p className="text-sm leading-relaxed">
              Fisioterapia profesional a domicilio en Lima. Recuperate en la comodidad de tu
              hogar — el fisioterapeuta va a tu casa con todo el equipamiento necesario.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">
              Servicios
            </h3>
            <ul className="space-y-2">
              {[
                'Dolor Lumbar',
                'Corrección Postural',
                'Rehabilitación Deportiva',
                'Terapia a Domicilio',
                'Hernias Discales',
                'Dolor Cervical',
              ].map((s) => (
                <li key={s}>
                  <a href="#servicios" className="text-sm transition-colors hover:text-white">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href="tel:+51954670730" className="text-sm hover:text-white transition-colors">
                  +51 954 670 730
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href="mailto:contacto@fisiovida.pe" className="text-sm hover:text-white transition-colors">
                  contacto@fisiovida.pe
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm">Lima, Perú</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm">Lun - Sáb: 8:00 AM - 7:00 PM</span>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Facebook" className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary hover:text-white">
                <Facebook className="size-4" />
              </a>
              <a href="#" aria-label="Instagram" className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary hover:text-white">
                <Instagram className="size-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary hover:text-white">
                <Linkedin className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} FisioEnCasa. Todos los derechos reservados.
          </p>
          <p className="text-sm text-gray-400">
            Hecho con <Heart className="inline size-3 text-red-400" /> en Lima, Perú
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════
   FLOATING WHATSAPP BUTTON
   ═══════════════════════════════════════════════════ */
function FloatingWhatsApp() {
  return (
    <a
      href={`${WHATSAPP_BASE_URL}?text=${encodeURIComponent('Hola, me gustaría agendar una cita de fisioterapia a domicilio')}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
    >
      <MessageCircle className="size-7" />
    </a>
  )
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════ */
export default function FisioEnCasaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProblemsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
        <AppointmentSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
