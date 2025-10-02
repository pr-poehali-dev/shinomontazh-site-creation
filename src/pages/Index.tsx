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
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 5,
    message: ''
  });
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

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

      {/* Promotions Section */}
      <section className="py-20 bg-gradient-to-br from-orange/10 via-white to-blue/10 scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate opacity-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Акции и спецпредложения</h2>
            <p className="text-xl text-gray-600">Выгодные предложения для наших клиентов</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="scroll-animate opacity-0 border-2 border-orange hover:shadow-2xl transition-all relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
              <div className="absolute top-0 right-0 bg-orange text-white px-4 py-2 rounded-bl-lg font-bold">
                -20%
              </div>
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange to-orange-dark rounded-full flex items-center justify-center">
                  <Icon name="Gift" size={32} className="text-white" />
                </div>
                <CardTitle className="text-2xl text-center">Первое посещение</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Скидка 20% на все услуги для новых клиентов при первом визите
                </p>
                <Badge className="bg-orange/20 text-orange border-orange text-lg px-4 py-2">
                  Действует до 31.12.2025
                </Badge>
              </CardContent>
            </Card>

            <Card className="scroll-animate opacity-0 border-2 border-blue hover:shadow-2xl transition-all relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
              <div className="absolute top-0 right-0 bg-blue text-white px-4 py-2 rounded-bl-lg font-bold">
                2 по цене 1
              </div>
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue to-blue-dark rounded-full flex items-center justify-center">
                  <Icon name="Users" size={32} className="text-white" />
                </div>
                <CardTitle className="text-2xl text-center">Приведи друга</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Приведи друга — получи вторую замену колес бесплатно!
                </p>
                <Badge className="bg-blue/20 text-blue border-blue text-lg px-4 py-2">
                  Постоянное предложение
                </Badge>
              </CardContent>
            </Card>

            <Card className="scroll-animate opacity-0 border-2 border-orange hover:shadow-2xl transition-all relative overflow-hidden" style={{ animationDelay: '0.3s' }}>
              <div className="absolute top-0 right-0 bg-gradient-to-r from-orange to-blue text-white px-4 py-2 rounded-bl-lg font-bold">
                Бонус
              </div>
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange to-blue rounded-full flex items-center justify-center">
                  <Icon name="Star" size={32} className="text-white" />
                </div>
                <CardTitle className="text-2xl text-center">Комплексное обслуживание</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Замена + балансировка + мойка колес = скидка 15%
                </p>
                <Badge className="bg-gradient-to-r from-orange/20 to-blue/20 text-gray-900 border-orange text-lg px-4 py-2">
                  Экономия до 1000₽
                </Badge>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12 scroll-animate opacity-0" style={{ animationDelay: '0.4s' }}>
            <p className="text-gray-600 text-lg mb-6">
              <Icon name="Info" size={20} className="inline mr-2 text-orange" />
              Акции не суммируются. Подробности уточняйте по телефону.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-orange to-blue hover:from-orange-dark hover:to-blue-dark text-white px-8 py-4 text-lg" asChild>
              <a href="tel:+79098722629">
                <Icon name="Phone" size={20} className="mr-2" />
                Узнать подробности
              </a>
            </Button>
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
          <div className="text-center mt-12 scroll-animate opacity-0" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange to-blue hover:from-orange-dark hover:to-blue-dark text-white px-8 py-4 text-lg"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              <Icon name="MessageSquare" size={20} className="mr-2" />
              {showReviewForm ? 'Скрыть форму' : 'Оставить отзыв'}
            </Button>
          </div>
          
          {showReviewForm && (
            <div className="max-w-2xl mx-auto mt-8 animate-fade-up">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Ваш отзыв</CardTitle>
                  <CardDescription className="text-center">Поделитесь впечатлениями о нашем сервисе</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    setTimeout(() => {
                      alert('Спасибо за ваш отзыв! Мы ценим ваше мнение.');
                      setReviewForm({ name: '', rating: 5, message: '' });
                      setShowReviewForm(false);
                      setIsSubmitting(false);
                    }, 1000);
                  }} className="space-y-6">
                    <div>
                      <Label htmlFor="review-name">Ваше имя</Label>
                      <Input
                        id="review-name"
                        type="text"
                        placeholder="Введите ваше имя"
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label>Оценка</Label>
                      <div className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewForm({...reviewForm, rating: star})}
                            className="transition-transform hover:scale-110"
                          >
                            <Icon 
                              name="Star" 
                              size={32} 
                              className={star <= reviewForm.rating ? 'text-orange fill-current' : 'text-gray-300'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="review-message">Ваш отзыв</Label>
                      <Textarea
                        id="review-message"
                        placeholder="Расскажите о вашем опыте..."
                        value={reviewForm.message}
                        onChange={(e) => setReviewForm({...reviewForm, message: e.target.value})}
                        rows={5}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-orange to-blue hover:from-orange-dark hover:to-blue-dark text-white"
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
                          Отправить отзыв
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
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

      {/* Online Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="lg" 
          className="rounded-full w-16 h-16 bg-gradient-to-r from-orange to-blue hover:from-orange-dark hover:to-blue-dark text-white shadow-2xl animate-bounce"
          asChild
        >
          <a href="tel:+79098722629" title="Связаться с нами">
            <Icon name="MessageCircle" size={28} />
          </a>
        </Button>
      </div>

      {/* Map Section */}
      <section className="py-20 bg-gray-50 scroll-animate opacity-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 scroll-animate opacity-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Как нас найти</h2>
            <p className="text-xl text-gray-600">г. Владивосток, ул. Снеговая, 2а</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl scroll-animate opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="aspect-video">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=131.915278%2C43.115139&z=17&l=map&pt=131.915278,43.115139,pm2rdm"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-0 hover:grayscale-0 transition-all duration-300"
                  title="Карта с адресом шиномонтажа"
                ></iframe>
              </div>
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg max-w-xs">
                <div className="flex items-center mb-2">
                  <Icon name="MapPin" size={20} className="text-orange mr-3" />
                  <span className="font-bold text-gray-900">ШиноПро</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">ул. Снеговая, 2а, Владивосток</p>
                <a 
                  href="https://yandex.ru/maps/?rtext=~43.115139,131.915278" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-orange hover:text-orange-dark transition-colors font-semibold"
                >
                  <Icon name="Navigation" size={16} className="mr-2" />
                  Построить маршрут
                </a>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <Card className="scroll-animate opacity-0" style={{ animationDelay: '0.3s' }}>
                <CardContent className="pt-6 text-center">
                  <Icon name="Car" size={32} className="text-orange mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Парковка</h3>
                  <p className="text-gray-600 text-sm">Удобная парковка на 20+ мест</p>
                </CardContent>
              </Card>
              <Card className="scroll-animate opacity-0" style={{ animationDelay: '0.4s' }}>
                <CardContent className="pt-6 text-center">
                  <Icon name="Clock" size={32} className="text-blue mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Режим работы</h3>
                  <p className="text-gray-600 text-sm">Пн-Вс: 8:00 - 20:00</p>
                </CardContent>
              </Card>
              <Card className="scroll-animate opacity-0" style={{ animationDelay: '0.5s' }}>
                <CardContent className="pt-6 text-center">
                  <Icon name="MapPin" size={32} className="text-orange mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Локация</h3>
                  <p className="text-gray-600 text-sm">Район Снеговая Падь</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <div className="fixed bottom-24 right-6 z-50 animate-fade-up">
          <Button 
            size="lg" 
            onClick={scrollToTop}
            className="rounded-full w-14 h-14 bg-white hover:bg-gray-100 text-orange shadow-2xl border-2 border-orange"
            title="Наверх"
          >
            <Icon name="ArrowUp" size={24} />
          </Button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Car" size={28} className="text-orange" />
                <span className="text-2xl font-bold">ШиноПро</span>
              </div>
              <p className="text-gray-400 text-sm">
                Профессиональный шиномонтаж во Владивостоке. Более 10 лет опыта.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Услуги</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-orange transition-colors cursor-pointer">Замена шин</li>
                <li className="hover:text-orange transition-colors cursor-pointer">Балансировка</li>
                <li className="hover:text-orange transition-colors cursor-pointer">Ремонт проколов</li>
                <li className="hover:text-orange transition-colors cursor-pointer">Хранение колес</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Контакты</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center">
                  <Icon name="Phone" size={16} className="text-orange mr-2" />
                  <a href="tel:+79098722629" className="hover:text-orange transition-colors">+7 (909) 872-26-29</a>
                </li>
                <li className="flex items-center">
                  <Icon name="Mail" size={16} className="text-orange mr-2" />
                  <a href="mailto:0768615@mail.ru" className="hover:text-orange transition-colors">0768615@mail.ru</a>
                </li>
                <li className="flex items-start">
                  <Icon name="MapPin" size={16} className="text-orange mr-2 mt-1" />
                  <span>г. Владивосток,<br />ул. Снеговая, 2а</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Режим работы</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex justify-between">
                  <span>Пн-Пт:</span>
                  <span className="text-orange">8:00 - 20:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Суббота:</span>
                  <span className="text-orange">9:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Воскресенье:</span>
                  <span className="text-orange">10:00 - 16:00</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024-2025 ШиноПро. Все права защищены.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center">
                  <Icon name="Shield" size={16} className="text-orange mr-2" />
                  Лицензированный сервис
                </span>
                <span className="flex items-center">
                  <Icon name="Award" size={16} className="text-orange mr-2" />
                  Гарантия качества
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;