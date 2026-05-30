"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type Lang = "uz" | "ru" | "en" | "tr"

export const translations = {
  uz: {
    // Nav
    nav_about: "Biz haqimizda",
    nav_contact: "Bog'lanish",
    // Footer
    footer_links: "Havolalar",
    footer_socials: "Ijtimoiy tarmoqlar",
    footer_about: "Biz haqimizda",
    footer_contact: "Aloqa",
    // Hero panels
    hero_panel_live: "JONLI ONLAYN\nDARSLAR",
    hero_panel_free: "BEPUL\nMASTERCLASSLAR",
    hero_panel_open: "JONLI OCHIQ\nDARSLAR",
    hero_badge_sub: "TYS C1 Sertifikat sohibasi",
    hero_img_sub: "Turk tilini professional darajada o'rganing",
    // Hero stats
    stat_success: "Muvaffaqiyat",
    stat_exp: "Yillik tajriba",
    stat_level: "TYS Daraja",
    // Courses / Results section
    courses_label: "Natijalar",
    courses_title: "O'quvchilar Sertifikatlari",
    courses_sub: "Bizning o'quvchilarimiz olgan Milliy sertifikatlar",
    cert_label: "Sertifikat",
    cert_student: "O'quvchi sertifikati",
    // Faculty / Reviews section
    faculty_label: "Sharhlar",
    faculty_title: "O'quvchilar Fikri",
    faculty_sub: "O'quvchilarimizning kurs haqidagi fikrlari",
    faculty_reviews: [
      { name: "Shohsanam Abdumannopova", role: "B2 milliy sertifikat", text: "Rahmat, Mashhura Hoca! Ilmingiz ziyoda bo'lsin! Alloh rozi bo'lsin! 😍🤲" },
      { name: "Feruza Azizovna",         role: "O'quvchi", text: "Darslarni juda tez va oson tushuntarasiz. Darslar bomba! Turk tili fanidan sizni ustoz qilganimdan afsuslanmayman, do'stlarimga ham tavsiya qildim. 😘" },
      { name: "Pokiza Bozorova",         role: "B1 milliy sertifikat", text: "Katta rahmat Mashhura opa sizga. Ilohim ilmingiz bundan-da ziyod bo'lsin. Alloh rozi bo'lsin. Ko'p bilimga ega bo'ldim. 🥰🤲🌹" },
      { name: "Sayyora Rasulova",        role: "B1 milliy sertifikat", text: "Mashhura zo'r darslar o'tyapsiz. Rahmat kattakon. Sizga o'xshab C1 olish nasib qilsin." },
      { name: "Muhlisa Bahromova",       role: "O'quvchi", text: "Yazmalarimni bu paytgacha bunaqa tahlil qilib berishmagan edi. Judayam minnatdorman ustoz sizdan. Oldinroq uchratmaganimga afsusdaman." },
      { name: "Nargiza Adahambekova",    role: "O'quvchi", text: "Bugun yuzma-yuz darsda o'tirgandek his qildim. Hocamiz samimiy o'rgatti, o'zlariga juda minnatdorman." },
      { name: "Dilshoda",                role: "O'quvchi", text: "Juda ham foydali ma'lumotlar oldik. Alloh rozi bo'lsin sizdan, rahmat!" },
      { name: "Ro'ziyeva Shaxnoza",      role: "O'quvchi", text: "Darsimiz juda yaxshi bo'ldi. Bilmagan narsalarimni o'rgandim. Shuning uchun sizga katta rahmat." },
      { name: "Zarnigor Isroilova",      role: "B1 milliy sertifikat", text: "Ustoz rahmat kattakon, barchasiga siz sababli bo'ldingiz. Allohim ilmimizni ziyoda qilsin." },
      { name: "Sarbiniso Ulug'bekova",   role: "O'quvchi", text: "Albatta men uchun dars zo'r bo'ldi. Bunaqangi dars ko'rmagandim. Ustoz zo'r ekan, taktikasiga gap bo'lishi mumkin emas!" },
      { name: "Sayyora Rasulova",        role: "B1 milliy sertifikat", text: "Bugungi so'zlashuv darsimiz chotki! 🔥 Ertangi so'zlashuv imtihonim uchun zo'r tayyorgarlik ko'rdik. Ustoz siz sababli. Alloh rozi bo'lsin. 🙏🤲" },
      { name: "Hamidova Go'zal", role: "B1 milliy sertifikat", text: "Assalomu aleykum, aziz ustozim! Darslaringiz super! Oz fursatda yuqori natijalarga erishdik. 4 oylik bola bilan shu darajaga yetkazib o'qish va o'qitish hammaning qo'lidan kelmaydi. 😘😍❤️" },
    ],
    // About
    about_title: "Mashhura Hoca haqida",
    about_label: "Biz haqimizda",
    about_features: [
      "Oliy ma'lumotli filolog",
      "Xalqaro toifadagi TYS C1 sertifikat sohibasi",
      "4 yillik tarjimonlik faoliyatida 15+ turkcha kitoblarni o'zbekchaga o'girgan",
      "Haqiqiy turk ustozlardan 2 yil ta'lim olgan",
      "O'quvchilari 100% sertifikat olgan",
      "Sertifikatga tayyorlash bo'yicha 2+ yillik tajribaga ega",
    ],
    stat_success4: "Muvaffaqiyat",
    stat_exp4: "Yillik tajriba",
    stat_books: "Kitob tarjimasi",
    stat_level4: "TYS Daraja",
    about_reviews_title: "O'quvchilar fikrlari",
    about_reviews: [
      { quote: "Rahmat, Mashhura Hoca! Ilmingiz ziyoda bo'lsin! Oz fursatda shuncha bilim oldim, juda minnatdorman.", author: "Shohsanam A.", role: "B2 milliy sertifikat" },
      { quote: "Katta rahmat Mashhura opa. Ko'p bilimga ega bo'ldim. Ilohim ilmingiz bundan-da ziyod bo'lsin.", author: "Pokiza B.", role: "B1 milliy sertifikat" },
      { quote: "Mashhura zo'r darslar o'tyapsiz. Rahmat kattakon. Sizga o'xshab C1 olish nasib qilsin.", author: "Sayyora R.", role: "B1 milliy sertifikat" },
      { quote: "Ustoz rahmat kattakon, barchasiga siz sababli bo'ldingiz. Allohim ilmimizni ziyoda qilsin.", author: "Zarnigor I.", role: "B1 milliy sertifikat" },
      { quote: "Darslaringiz super! 4 oylik bola bilan shu darajaga yetkazib o'qish va o'qitish hammaning qo'lidan kelmaydi.", author: "Hamidova G.", role: "B1 milliy sertifikat" },
    ],
    cert_view: "TYS Sertifikatini ko'rish",
    cert_modal_title: "TYS Sertifikati",
    // Connect
    connect_email_label: "Email",
    connect_location_label: "Toshkent",
    connect_location_value: "Toshkent sh., Yangihayot t., 'Yangi Darxon' MFY, G'ishtko'prik ko'chasi, 34-uy",
    connect_hours_label: "Ish vaqti",
    connect_hours_value: "Du–Sha: 09:00–20:00",
    connect_title: "Bog'lanish",
    connect_sub: "Savollaringiz bormi? Bizga xabar yuboring.",
    connect_name: "Ism",
    connect_lastname: "Familiya",
    connect_phone: "Telefon raqam",
    connect_message: "Xabar",
    connect_send: "Xabar yuborish",
    connect_success_title: "Xabar yuborildi!",
    connect_success_sub: "Murojaat qilganingiz uchun rahmat. 24 soat ichida javob beramiz.",
  },

  ru: {
    nav_about: "О нас",
    nav_contact: "Связаться",
    footer_links: "Ссылки",
    footer_socials: "Социальные сети",
    footer_about: "О нас",
    footer_contact: "Контакт",
    hero_panel_live: "ЖИВЫЕ ОНЛАЙН\nУРОКИ",
    hero_panel_free: "БЕСПЛАТНЫЕ\nМАСТЕРКЛАССЫ",
    hero_panel_open: "ЖИВЫЕ ОТКРЫТЫЕ\nУРОКИ",
    hero_badge_sub: "Обладатель сертификата TYS C1",
    hero_img_sub: "Изучайте турецкий язык профессионально",
    stat_success: "Успех",
    stat_exp: "Лет опыта",
    stat_level: "Уровень TYS",
    courses_label: "Результаты",
    courses_title: "Сертификаты учеников",
    courses_sub: "Официальные международные сертификаты наших учеников",
    cert_label: "Сертификат",
    cert_student: "Сертификат ученика",
    faculty_label: "Отзывы",
    faculty_title: "Мнения учеников",
    faculty_sub: "Настоящие отзывы наших учеников о курсе",
    faculty_reviews: [
      { name: "Shohsanam Abdumannopova", role: "B2 миллий сертификат", text: "Спасибо, Mashhura Hoca! Пусть ваши знания множатся! Да будет доволен вами Аллах! 😍🤲" },
      { name: "Feruza Azizovna",         role: "Ученица", text: "Объясняете уроки очень быстро и легко. Уроки — бомба! Не жалею, что выбрала вас учителем по турецкому, рекомендовала подругам. 😘" },
      { name: "Pokiza Bozorova",         role: "B1 миллий сертификат", text: "Большое спасибо, Mashhura opa. Пусть Аллах умножит ваши знания. Узнала очень много нового. 🥰🤲🌹" },
      { name: "Sayyora Rasulova",        role: "B1 миллий сертификат", text: "Mashhura, вы проводите отличные уроки. Огромное спасибо. Пусть вам тоже дано будет получить C1." },
      { name: "Muhlisa Bahromova",       role: "Ученица", text: "Мои работы никогда так подробно не анализировали. Очень благодарна вам, устаз. Жаль, что не нашла вас раньше." },
      { name: "Nargiza Adahambekova",    role: "Ученица", text: "Сегодня получила знания, как будто присутствовала на очном занятии. Hocamız преподавала искренне, очень ей благодарна." },
      { name: "Dilshoda",                role: "Ученица", text: "Получили очень полезную информацию. Да будет доволен вами Аллах, спасибо!" },
      { name: "Ro'ziyeva Shaxnoza",      role: "Ученица", text: "Урок прошёл очень хорошо. Узнала то, чего не знала. За это вам большое спасибо." },
      { name: "Zarnigor Isroilova",      role: "B1 миллий сертификат", text: "Устаз, огромное спасибо — всё это благодаря вам. Пусть Аллах умножит наши знания." },
      { name: "Sarbiniso Ulug'bekova",   role: "Ученица", text: "Урок определённо был замечательным. Такого урока я ещё не видела. Устаз — отличный, к тактике нет никаких претензий!" },
      { name: "Sayyora Rasulova",        role: "B1 миллий сертификат", text: "Сегодняшний разговорный урок — огонь! 🔥 Отличная подготовка к завтрашнему разговорному экзамену. Всё благодаря вам, устаз. Да будет доволен вами Аллах. 🙏🤲" },
      { name: "Hamidova Go'zal", role: "B1 миллий сертификат", text: "Здравствуйте, дорогой учитель! Уроки супер! За короткое время достигли высоких результатов. Учиться и учить с 4-месячным ребёнком — это дано не каждому. 😘😍❤️" },
    ],
    about_title: "О Mashhura Hoca",
    about_label: "О нас",
    about_features: [
      "Дипломированный филолог",
      "Международный сертификат TYS C1",
      "Перевела 15+ турецких книг на узбекский за 4 года",
      "2 года обучалась у настоящих турецких преподавателей",
      "100% учеников получили сертификат",
      "2+ лет опыта подготовки к сертификации",
    ],
    stat_success4: "Успех",
    stat_exp4: "Лет опыта",
    stat_books: "Переводов книг",
    stat_level4: "Уровень TYS",
    about_reviews_title: "Отзывы учеников",
    about_reviews: [
      { quote: "Спасибо, Mashhura Hoca! Пусть ваши знания множатся! За короткое время узнала так много.", author: "Shohsanam A.", role: "B2 миллий сертификат" },
      { quote: "Большое спасибо, Mashhura opa. Узнала очень много нового. Пусть Аллах умножит ваши знания.", author: "Pokiza B.", role: "B1 миллий сертификат" },
      { quote: "Mashhura, вы проводите отличные уроки. Огромное спасибо. Пусть вам тоже дано получить C1.", author: "Sayyora R.", role: "B1 миллий сертификат" },
      { quote: "Устаз, огромное спасибо — всё это благодаря вам. Пусть Аллах умножит наши знания.", author: "Zarnigor I.", role: "B1 миллий сертификат" },
      { quote: "Уроки супер! Учиться и учить с 4-месячным ребёнком — это дано не каждому.", author: "Hamidova G.", role: "B1 миллий сертификат" },
    ],
    cert_view: "Посмотреть сертификат TYS",
    cert_modal_title: "Сертификат TYS",
    connect_email_label: "Email",
    connect_location_label: "Ташкент",
    connect_location_value: "г. Ташкент, р-н Янгихаёт, МФЙ 'Янги Дархон', ул. Гиштко‘прик, д. 34",
    connect_hours_label: "Время работы",
    connect_hours_value: "Пн–Сб: 09:00–20:00",
    connect_title: "Связаться",
    connect_sub: "Есть вопросы? Отправьте нам сообщение.",
    connect_name: "Имя",
    connect_lastname: "Фамилия",
    connect_phone: "Номер телефона",
    connect_message: "Сообщение",
    connect_send: "Отправить",
    connect_success_title: "Сообщение отправлено!",
    connect_success_sub: "Спасибо за обращение. Ответим в течение 24 часов.",
  },

  en: {
    nav_about: "About Us",
    nav_contact: "Contact",
    footer_links: "Links",
    footer_socials: "Social Media",
    footer_about: "About Us",
    footer_contact: "Contact",
    hero_panel_live: "LIVE ONLINE\nLESSONS",
    hero_panel_free: "FREE\nMASTERCLASSES",
    hero_panel_open: "LIVE OPEN\nLESSONS",
    hero_badge_sub: "TYS C1 Certificate Holder",
    hero_img_sub: "Learn Turkish at a professional level",
    stat_success: "Success Rate",
    stat_exp: "Years Experience",
    stat_level: "TYS Level",
    courses_label: "Results",
    courses_title: "Student Certificates",
    courses_sub: "Official international certificates earned by our students",
    cert_label: "Certificate",
    cert_student: "Student certificate",
    faculty_label: "Reviews",
    faculty_title: "Student Opinions",
    faculty_sub: "Real reviews from our students about the course",
    faculty_reviews: [
      { name: "Shohsanam Abdumannopova", role: "B2 National Certificate", text: "Thank you, Mashhura Hoca! May your knowledge grow! May Allah be pleased with you! 😍🤲" },
      { name: "Feruza Azizovna",         role: "Student", text: "You explain the lessons very quickly and easily. Classes are amazing! I don't regret choosing you as my Turkish teacher, and I've recommended you to my friends too. 😘" },
      { name: "Pokiza Bozorova",         role: "B1 National Certificate", text: "Thank you so much, Mashhura opa. May Allah increase your knowledge. I've learned so much. 🥰🤲🌹" },
      { name: "Sayyora Rasulova",        role: "B1 National Certificate", text: "Mashhura, you're giving amazing lessons. Many thanks. May you also be blessed with C1." },
      { name: "Muhlisa Bahromova",       role: "Student", text: "My writings have never been analyzed like this before. I'm so grateful to you, teacher. I regret not finding you sooner." },
      { name: "Nargiza Adahambekova",    role: "Student", text: "Today I gained knowledge as if I were in a face-to-face class. Our teacher taught sincerely, I'm very thankful." },
      { name: "Dilshoda",               role: "Student", text: "We received very useful information. May Allah be pleased with you, thank you!" },
      { name: "Ro'ziyeva Shaxnoza",      role: "Student", text: "The lesson went very well. I learned things I didn't know. Thank you so much for that." },
      { name: "Zarnigor Isroilova",      role: "B1 National Certificate", text: "Teacher, many thanks — it's all because of you. May Allah increase our knowledge." },
      { name: "Sarbiniso Ulug'bekova",   role: "Student", text: "The lesson was definitely great. I've never had a lesson like this. The teacher is amazing, the teaching technique is flawless!" },
      { name: "Sayyora Rasulova",        role: "B1 National Certificate", text: "Today's speaking class was on fire! 🔥 Great preparation for tomorrow's speaking exam. All thanks to you, teacher. May Allah be pleased with you. 🙏🤲" },
      { name: "Hamidova Go'zal", role: "B1 National Certificate", text: "Hello, dear teacher! Your lessons are super! We achieved great results in a short time. Studying and teaching with a 4-month-old baby is not something everyone can do. 😘😍❤️" },
    ],
    about_title: "About Mashhura Hoca",
    about_label: "About Us",
    about_features: [
      "Higher-educated philologist",
      "International TYS C1 Certificate holder",
      "Translated 15+ Turkish books into Uzbek over 4 years",
      "Studied under native Turkish instructors for 2 years",
      "100% of students received certificates",
      "2+ years of certification preparation experience",
    ],
    stat_success4: "Success Rate",
    stat_exp4: "Years Experience",
    stat_books: "Book Translations",
    stat_level4: "TYS Level",
    about_reviews_title: "Student Reviews",
    about_reviews: [
      { quote: "Thank you, Mashhura Hoca! May your knowledge grow! I've gained so much in such a short time.", author: "Shohsanam A.", role: "B2 National Certificate" },
      { quote: "Thank you so much, Mashhura opa. I've learned so much. May Allah increase your knowledge.", author: "Pokiza B.", role: "B1 National Certificate" },
      { quote: "You're giving amazing lessons. Many thanks. May you also be blessed with C1.", author: "Sayyora R.", role: "B1 National Certificate" },
      { quote: "Teacher, many thanks — it's all because of you. May Allah increase our knowledge.", author: "Zarnigor I.", role: "B1 National Certificate" },
      { quote: "Your lessons are super! Studying with a 4-month-old baby and reaching this level is not for everyone.", author: "Hamidova G.", role: "B1 National Certificate" },
    ],
    cert_view: "View TYS Certificate",
    cert_modal_title: "TYS Certificate",
    connect_email_label: "Email",
    connect_location_label: "Tashkent",
    connect_location_value: "Tashkent city, Yangihayot dist., 'Yangi Darxon' MFY, G'ishtko'prik str., 34",
    connect_hours_label: "Working Hours",
    connect_hours_value: "Mon–Sat: 09:00–20:00",
    connect_title: "Contact Us",
    connect_sub: "Have questions? Send us a message.",
    connect_name: "First Name",
    connect_lastname: "Last Name",
    connect_phone: "Phone Number",
    connect_message: "Message",
    connect_send: "Send Message",
    connect_success_title: "Message Sent!",
    connect_success_sub: "Thank you for reaching out. We'll reply within 24 hours.",
  },

  tr: {
    nav_about: "Hakkımızda",
    nav_contact: "İletişim",
    footer_links: "Bağlantılar",
    footer_socials: "Sosyal Medya",
    footer_about: "Hakkımızda",
    footer_contact: "İletişim",
    hero_panel_live: "CANLI ONLINE\nDERSLER",
    hero_panel_free: "ÜCRETSİZ\nMASTERCLASSLAR",
    hero_panel_open: "CANLI AÇIK\nDERSLER",
    hero_badge_sub: "TYS C1 Sertifika Sahibi",
    hero_img_sub: "Türkçeyi profesyonel düzeyde öğrenin",
    stat_success: "Başarı Oranı",
    stat_exp: "Yıllık Deneyim",
    stat_level: "TYS Seviyesi",
    courses_label: "Sonuçlar",
    courses_title: "Öğrenci Sertifikaları",
    courses_sub: "Öğrencilerimizin aldığı resmi uluslararası sertifikalar",
    cert_label: "Sertifika",
    cert_student: "Öğrenci sertifikası",
    faculty_label: "Yorumlar",
    faculty_title: "Öğrenci Görüşleri",
    faculty_sub: "Öğrencilerimizin kurs hakkındaki gerçek görüşleri",
    faculty_reviews: [
      { name: "Shohsanam Abdumannopova", role: "B2 Ulusal Sertifika", text: "Teşekkürler, Mashhura Hoca! İlminiz bereketlensin! Allah razı olsun! 😍🤲" },
      { name: "Feruza Azizovna",         role: "Öğrenci", text: "Dersleri çok hızlı ve kolay anlatıyorsunuz. Dersler muhteşem! Sizi Türkçe hocam yaptığım için hiç pişman değilim, arkadaşlarıma da tavsiye ettim. 😘" },
      { name: "Pokiza Bozorova",         role: "B1 Ulusal Sertifika", text: "Çok teşekkürler Mashhura opa. İnşallah ilminiz daha da artır. Allah razı olsun. Çok şey öğrendim. 🥰🤲🌹" },
      { name: "Sayyora Rasulova",        role: "B1 Ulusal Sertifika", text: "Mashhura, harika dersler veriyorsunuz. Çok teşekkürler. Sizin gibi C1 almanız nasip olsun." },
      { name: "Muhlisa Bahromova",       role: "Öğrenci", text: "Yazılarımı şimdiye kadar hiç bu şekilde analiz etmemişlerdi. Size çok minnettarım hocam. Sizi daha önce bulamamış olmama üzüldüm." },
      { name: "Nargiza Adahambekova",    role: "Öğrenci", text: "Bugün yüz yüze derslerde bulunuyormuş gibi bilgiler aldım. Hocamız içtenlikle öğretti, kendisine çok teşekkür ederim." },
      { name: "Dilshoda",               role: "Öğrenci", text: "Çok faydalı bilgiler aldık. Allah razı olsun sizden, teşekkürler!" },
      { name: "Ro'ziyeva Shaxnoza",      role: "Öğrenci", text: "Dersimiz çok iyi oldu hocam. Bilmediğim bilgileri öğrendim. Onun için size çok teşekkürler." },
      { name: "Zarnigor Isroilova",      role: "B1 Ulusal Sertifika", text: "Hocam çok teşekkürler, hepsi sizin sayenizde. Allah ilmimizi artırsın." },
      { name: "Sarbiniso Ulug'bekova",   role: "Öğrenci", text: "Ders kesinlikle mükemmeldi. Böyle bir ders görmemiştim. Hoca harika, taktiğine hiçbir şey diyemezsiniz!" },
      { name: "Sayyora Rasulova",        role: "B1 Ulusal Sertifika", text: "Bugünkü konuşma dersimiz muhteşemdi! 🔥 Yarınki konuşma sınavım için harika bir hazırlık yaptık. Hocam sayenizde. Allah razı olsun. 🙏🤲" },
      { name: "Hamidova Go'zal", role: "B1 Ulusal Sertifika", text: "Merhaba, sevgili hocam! Dersleriniz süper! Kısa sürede yüksek sonuçlara ulaştık. 4 aylık bebekle bu seviyede okumak ve öğretmek herkese nasip olmaz. 😘😍❤️" },
    ],
    about_title: "Mashhura Hoca Hakkında",
    about_label: "Hakkımızda",
    about_features: [
      "Yüksek lisans mezunu filolog",
      "Uluslararası TYS C1 sertifika sahibi",
      "4 yılda 15+ Türkçe kitabı Özbekçeye çevirdi",
      "2 yıl Türk öğretmenlerden eğitim aldı",
      "Öğrencilerin %100'ü sertifika aldı",
      "2+ yıllık sertifikasyon hazırlık deneyimi",
    ],
    stat_success4: "Başarı Oranı",
    stat_exp4: "Yıllık Deneyim",
    stat_books: "Kitap Çevirisi",
    stat_level4: "TYS Seviyesi",
    about_reviews_title: "Öğrenci Görüşleri",
    about_reviews: [
      { quote: "Teşekkürler, Mashhura Hoca! İlminiz bereketlensin! Kısa sürede bu kadar çok şey öğrendim.", author: "Shohsanam A.", role: "B2 Ulusal Sertifika" },
      { quote: "Çok teşekkürler Mashhura opa. Çok şey öğrendim. İnşallah ilminiz daha da artsın.", author: "Pokiza B.", role: "B1 Ulusal Sertifika" },
      { quote: "Harika dersler veriyorsunuz. Çok teşekkürler. Sizin gibi C1 almanız nasip olsun.", author: "Sayyora R.", role: "B1 Ulusal Sertifika" },
      { quote: "Hocam çok teşekkürler, hepsi sizin sayenizde. Allah ilmimizi artırsın.", author: "Zarnigor I.", role: "B1 Ulusal Sertifika" },
      { quote: "Dersleriniz süper! 4 aylık bebekle bu seviyeye ulaşmak herkese nasip olmaz.", author: "Hamidova G.", role: "B1 Ulusal Sertifika" },
    ],
    cert_view: "TYS Sertifikasını Görüntüle",
    cert_modal_title: "TYS Sertifikası",
    connect_email_label: "E-posta",
    connect_location_label: "Taşkent",
    connect_location_value: "Taşkent şehri, Yangihayot il., 'Yangi Darxon' MFY, G'ishtko'prik sk., No:34",
    connect_hours_label: "Çalışma Saatleri",
    connect_hours_value: "Pzt–Cmt: 09:00–20:00",
    connect_title: "İletişim",
    connect_sub: "Sorularınız mı var? Bize mesaj gönderin.",
    connect_name: "İsim",
    connect_lastname: "Soyisim",
    connect_phone: "Telefon Numarası",
    connect_message: "Mesaj",
    connect_send: "Mesaj Gönder",
    connect_success_title: "Mesaj Gönderildi!",
    connect_success_sub: "Ulaştığınız için teşekkürler. 24 saat içinde yanıt vereceğiz.",
  },
}

export type TranslationKey = keyof typeof translations["uz"]

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TranslationKey) => any
}

const LangContext = createContext<LangContextType>({
  lang: "uz",
  setLang: () => {},
  t: (key) => (translations.uz as any)[key],
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("uz")

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null
    if (saved && ["uz", "ru", "en", "tr"].includes(saved)) setLangState(saved)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem("lang", l)
  }

  const t = (key: TranslationKey) =>
    (translations[lang] as any)[key] ?? (translations.uz as any)[key] ?? key

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
