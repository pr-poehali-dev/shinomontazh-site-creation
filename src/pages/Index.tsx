import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const services = [
    {
      icon: 'Wrench',
      title: 'Замена шин',
      description: 'Быстрая и качественная замена шин любого размера',
      price: 'от 800₽'
    },
    {
      icon: 'Settings',
      title: 'Балансировка колес',
      description: 'Компьютерная балансировка для плавной езды',
      price: 'от 600₽'
    },
    {
      icon: 'CheckCircle',
      title: 'Ремонт шин',
      description: 'Восстановление поврежденных шин и камер',
      price: 'от 400₽'
    },
    {
      icon: 'Car',
      title: 'Диагностика подвески',
      description: 'Полная диагностика ходовой части автомобиля',
      price: 'от 1200₽'
    }
  ];

  const priceList = [
    { service: 'Снятие/установка колеса R13-R15', price: '300₽' },
    { service: 'Снятие/установка колеса R16-R18', price: '400₽' },
    { service: 'Снятие/установка колеса R19+', price: '500₽' },
    { service: 'Балансировка R13-R15', price: '200₽' },
    { service: 'Балансировка R16-R18', price: '300₽' },
    { service: 'Балансировка R19+', price: '400₽' },
    { service: 'Ремонт прокола', price: '300₽' },
    { service: 'Установка заплатки', price: '400₽' }
  ];

  const galleryImages = [
    'img/1a935edc-dd47-4329-988d-f2e5d3aa882c.jpg',
    'img/e4d3582b-47e8-4c6c-9570-3c0d0966b62b.jpg',
    'img/70ac0751-47e7-4b53-9db4-9786cc5258cc.jpg',
    '/placeholder.svg'
  ];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Имитация отправки email (в реальном проекте здесь был бы API вызов)
      const emailData = {
        to: 'info@shinopro.ru',
        subject: `Новая заявка на шиномонтаж от ${bookingForm.name}`,
        body: `
          Имя: ${bookingForm.name}
          Телефон: ${bookingForm.phone}
          Услуга: ${bookingForm.service}
          Желаемая дата: ${bookingForm.date}
          Дополнительная информация: ${bookingForm.message}
        `
      };

      console.log('Email data:', emailData);
      
      // Симуляция задержки отправки
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
      setBookingForm({ name: '', phone: '', service: '', date: '', message: '' });
    } catch (error) {
      console.error('Ошибка отправки:', error);
      alert('❌ Произошла ошибка при отправке. Пожалуйста, попробуйте позже или позвоните нам.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Icon name="Car" size={32} className="text-orange" />
              <h1 className="text-2xl font-bold text-gray-900">ШиноПро</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-600 hover:text-orange transition-colors">Услуги</a>
              <a href="#gallery" className="text-gray-600 hover:text-orange transition-colors">Галерея</a>
              <a href="#prices" className="text-gray-600 hover:text-orange transition-colors">Цены</a>
              <a href="#contact" className="text-gray-600 hover:text-orange transition-colors">Контакты</a>
              <a href="#about" className="text-gray-600 hover:text-orange transition-colors">О нас</a>
            </div>
            <Button className="bg-orange hover:bg-orange-dark text-white" asChild>
              <a href="tel:+79098722629">
                <Icon name="Phone" size={16} className="mr-2" />
                +7 (909) 872-26-29
              </a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange via-orange-light to-blue opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Профессиональный
              <span className="bg-gradient-to-r from-orange to-blue bg-clip-text text-transparent"> шиномонтаж</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Качественные услуги по замене и ремонту шин. Современное оборудование, опытные мастера, 
              гарантия на все виды работ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange hover:bg-orange-dark text-white px-8 py-4 text-lg">
                <Icon name="Calendar" size={20} className="mr-2" />
                Записаться онлайн
              </Button>
              <Button size="lg" variant="outline" className="border-blue text-blue hover:bg-blue hover:text-white px-8 py-4 text-lg" asChild>
                <a href="tel:+79098722629">
                  <Icon name="Phone" size={20} className="mr-2" />
                  +7 (909) 872-26-29
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate opacity-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Наши услуги</h2>
            <p className="text-xl text-gray-600">Полный спектр услуг для вашего автомобиля</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group cursor-pointer scroll-animate opacity-0" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange to-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name={service.icon as any} size={24} className="text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary" className="bg-orange/10 text-orange text-lg px-4 py-2">
                    {service.price}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Online Booking Section */}
      <section className="py-20 bg-gradient-to-br from-orange/5 to-blue/5 scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12 scroll-animate opacity-0">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Онлайн запись</h2>
              <p className="text-xl text-gray-600">Забронируйте удобное время прямо сейчас</p>
            </div>
            <Card className="scroll-animate opacity-0">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Форма записи</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Введите ваше имя"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (909) 872-26-29"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="service">Услуга</Label>
                    <Input
                      id="service"
                      type="text"
                      placeholder="Какая услуга нужна?"
                      value={bookingForm.service}
                      onChange={(e) => setBookingForm({...bookingForm, service: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Желаемая дата</Label>
                    <Input
                      id="date"
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Дополнительная информация</Label>
                    <Textarea
                      id="message"
                      placeholder="Расскажите подробнее о вашем автомобиле или особых требованиях"
                      value={bookingForm.message}
                      onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-orange hover:bg-orange-dark text-white text-lg py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                        Отправляем...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={20} className="mr-2" />
                        Отправить заявку
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate opacity-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Галерея работ</h2>
            <p className="text-xl text-gray-600">Примеры наших работ и современное оборудование</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg aspect-square scroll-animate opacity-0" style={{ animationDelay: `${index * 0.15}s` }}>
                <img 
                  src={image} 
                  alt={`Работа ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold">Работа #{index + 1}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section id="prices" className="py-20 bg-gray-50 scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate opacity-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Цены на услуги</h2>
            <p className="text-xl text-gray-600">Прозрачные и честные цены без скрытых доплат</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="scroll-animate opacity-0">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Прайс-лист</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {priceList.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-4 border-b border-gray-200 last:border-b-0">
                      <span className="text-gray-700">{item.service}</span>
                      <span className="font-semibold text-orange text-lg">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-gradient-to-r from-orange/10 to-blue/10 rounded-lg">
                  <p className="text-center text-gray-700">
                    <Icon name="Info" size={20} className="inline mr-2" />
                    Точная стоимость определяется после осмотра автомобиля. Все цены указаны за одно колесо.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center scroll-animate opacity-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">О нас</h2>
            <p className="text-xl text-gray-600 mb-8">
              Наш шиномонтаж работает уже более 10 лет, предоставляя качественные услуги 
              по обслуживанию автомобилей. Мы используем современное оборудование и 
              оригинальные запчасти, гарантируем высокое качество работ.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center scroll-animate opacity-0" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange to-blue rounded-full flex items-center justify-center">
                  <Icon name="Award" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">10+ лет опыта</h3>
                <p className="text-gray-600">Многолетний опыт работы с автомобилями любых марок</p>
              </div>
              <div className="text-center scroll-animate opacity-0" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange to-blue rounded-full flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">5000+ клиентов</h3>
                <p className="text-gray-600">Довольных клиентов, которые доверяют нам свои автомобили</p>
              </div>
              <div className="text-center scroll-animate opacity-0" style={{ animationDelay: '0.3s' }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange to-blue rounded-full flex items-center justify-center">
                  <Icon name="Coffee" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Бесплатный кофе</h3>
                <p className="text-gray-600">Угощаем каждого клиента ароматным кофе во время ожидания</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate opacity-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Отзывы клиентов</h2>
            <p className="text-xl text-gray-600">Что говорят о нас наши клиенты</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="scroll-animate opacity-0 hover:shadow-xl transition-shadow" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange to-blue flex items-center justify-center text-white font-bold text-lg mr-4">
                    АС
                  </div>
                  <div>
                    <CardTitle className="text-lg">Алексей Соколов</CardTitle>
                    <div className="flex text-orange mt-1">
                      <Icon name="Star" size={16} className="fill-current" />
                      <Icon name="Star" size={16} className="fill-current" />
                      <Icon name="Star" size={16} className="fill-current" />
                      <Icon name="Star" size={16} className="fill-current" />
                      <Icon name="Star" size={16} className="fill-current" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Отличный сервис! Быстро переобули на зимнюю резину, сделали балансировку. Ребята профессионалы своего дела. Кофе действительно вкусный, время пролетело незаметно!
                </p>
              </CardContent>
            </Card>

            <Card className="scroll-animate opacity-0 hover:shadow-xl transition-shadow" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue to-orange flex items-center justify-center text-white font-bold text-lg mr-4">
                    МК
                  </div>
                  <div>
                    <CardTitle className="text-lg">Марина Кузнецова</CardTitle>
                    <div className="flex text-orange mt-1">
                      <Icon name="Star" size={16} className="fill-current" />
                      <Icon name="Star" size={16} className="fill-current" />
                      <Icon name="Star" size={16} className="fill-current" />
                      <Icon name="Star" size={16} className="fill-current" />
                      <Icon name="Star" size={16} className="fill-current" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Обращаюсь сюда уже третий год подряд. Цены адекватные, работают качественно и быстро. Очень удобная онлайн-запись. Всем рекомендую этот шиномонтаж!
                </p>
              </CardContent>
            </Card>

            <Card className="scroll-animate opacity-0 hover:shadow-xl transition-shadow" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange to-blue flex items-center justify-center text-white font-bold text-lg mr-4">
                    ДП
                  </div>
                  <div>
                    <CardTitle className="text-lg">Дмитрий Петров</CardTitle>
                    <div className="flex text-orange mt-1">
                      <Icon name="Star" size={16} className="fill-current" />
                      <Icon name="Star" size={16} className="fill-current" />
                      <Icon name="Star" size={16} className="fill-current" />
                      <Icon name="Star" size={16} className="fill-current" />
                      <Icon name="Star" size={16} className="fill-current" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Приятно удивлён уровнем сервиса! Современное оборудование, чистая зона ожидания. Мастера объяснили все нюансы по состоянию резины. Буду обращаться ещё!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 scroll-animate opacity-0">Контакты</h2>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="scroll-animate opacity-0" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-2xl font-semibold mb-6">Свяжитесь с нами</h3>
                <div className="space-y-4">
                  <a href="tel:+79098722629" className="flex items-center hover:text-orange transition-colors">
                    <Icon name="Phone" size={20} className="text-orange mr-4" />
                    <span className="text-lg">+7 (909) 872-26-29</span>
                  </a>
                  <div className="flex items-center">
                    <Icon name="Mail" size={20} className="text-orange mr-4" />
                    <span className="text-lg">0768615@mail.ru</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="MapPin" size={20} className="text-orange mr-4" />
                    <span className="text-lg">г. Владивосток, ул. Снеговая, 2а</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Clock" size={20} className="text-orange mr-4" />
                    <span className="text-lg">Пн-Вс: 8:00 - 20:00</span>
                  </div>
                </div>
              </div>
              <div className="scroll-animate opacity-0" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-2xl font-semibold mb-6">Режим работы</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Понедельник - Пятница</span>
                    <span className="text-orange">8:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Суббота</span>
                    <span className="text-orange">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Воскресенье</span>
                    <span className="text-orange">10:00 - 16:00</span>
                  </div>
                </div>
              </div>
              <div className="scroll-animate opacity-0" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-2xl font-semibold mb-6">Наш адрес</h3>
                <div className="relative">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
                    <iframe
                      src="https://yandex.ru/map-widget/v1/?ll=131.915278%2C43.115139&z=17&l=map&pt=131.915278,43.115139,pm2rdm"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale hover:grayscale-0 transition-all duration-300"
                      title="Карта с адресом шиномонтажа"
                    ></iframe>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3 text-gray-900 text-sm">
                    <div className="flex items-center">
                      <Icon name="MapPin" size={16} className="text-orange mr-2" />
                      <span className="font-semibold">ШиноПро</span>
                    </div>
                    <p className="text-xs mt-1">ул. Снеговая, 2а</p>
                  </div>
                  <a 
                    href="https://yandex.ru/maps/?rtext=~43.115139,131.915278" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute bottom-4 left-4 bg-orange/90 backdrop-blur rounded-lg p-2 text-white text-xs hover:bg-orange transition-colors cursor-pointer"
                  >
                    <Icon name="Navigation" size={14} className="inline mr-1" />
                    Построить маршрут
                  </a>
                </div>
                <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-300 mb-2">
                    <Icon name="Car" size={16} className="inline mr-2 text-orange" />
                    Удобная парковка для 20+ автомобилей
                  </p>
                  <p className="text-sm text-gray-300">
                    <Icon name="MapPin" size={16} className="inline mr-2 text-orange" />
                    Район Снеговая Падь, Владивосток
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Icon name="Car" size={24} className="text-orange" />
              <span className="text-xl font-bold">ШиноПро</span>
            </div>
            <p className="text-gray-400">© 2024 ШиноПро. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;