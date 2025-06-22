<template>
  <div class="welcome-page">
    <section class="welcome-hero">
      <div class="container">
        <div>Мы предлагаем</div>
        <h1>Самый низкий тариф по продвижению площадок на рынке</h1>
        <div>
          <Buttons button-name="К размещению" />
          <Buttons button-name="К условиям" />
        </div>
      </div>
    </section>
    <section class="condition">
      <div class="container">
        <div>
          <Logo />
          <h2>Разместите ваше пространство</h2>
          <ul>
            <li>Предоставляем лучшие SEO-позиции в Рунете</li>
            <li>Продвигаем вас по платным каналам</li>
            <li>
              Рекламируем площадки бесплатно в нашем блоге, который читают 180
              000 человек ежемесячно
            </li>
          </ul>
          <Buttons button-name="Условия" />
        </div>
        <div>
          <img src="@/assets/img/welcome-condition.png" />
        </div>
      </div>
    </section>
    <section class="services">
      <div class="container">
        <h2>Наши преимущества</h2>
        <ul>
          <li>
            <div><IconPercent /></div>
            <div>
              <h4>Принимайте платежи онлайн</h4>
              <p>
                Выставляйте счета и принимайте оплаты за вычетом комиссии от 10
                до 20 % за платёж в зависимости от условий.
              </p>
            </div>
          </li>
          <li>
            <div><IconArrowUp /></div>
            <div>
              <h4>В два раза лучше, чем ваш маркетолог</h4>
              <p>
                Берём маркетинг на себя: наши менеджеры предложат маркетинговые
                решения, благодаря чему вы сконцентрируетесь только на нашей
                платформе и прямых продажах. Это выгоднее, чем «Яндекс-директ»,
                «Google Adwords» и другие способы продвижения.
              </p>
            </div>
          </li>
          <li>
            <div><IconFile /></div>
            <div>
              <h4>Подготовим нужную документацию</h4>
              <p>
                Предоставим закрывающую и прочую документацию в кратчайшие
                сроки: выгружайте из личного кабинета онлайн, получайте
                физические копии позже. Работаем с электронным документооборотом
                (ЭДО).
              </p>
            </div>
          </li>
          <li>
            <div><IconVerticalFreeLine /></div>
            <div>
              <h4>Уникальные алгоритмы подбора</h4>
              <p>
                Благодаря уникальным алгоритмам подбора, мы максимизируем ваш
                доход, приводя подходящих клиентов и рекомендуя вашу площадку.
                Ежедневно наша команда разработки улучшает сервис и
                актуализирует техническую начинку.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="stats">
      <div class="container">
        <h3>Ключевые цифры</h3>
        <ul>
          <li>
            <p>2.2</p>
            <span
              >млн уникальных посетителей в год и этот показатель растёт</span
            >
          </li>
          <li>
            <p>340</p>
            <span
              >млн руб. заработали площадки в Москве за период работы
              сервиса</span
            >
          </li>
          <li>
            <p>210</p>
            <span>
              тысяч заявок получили площадки от нашей платформы суммарно</span
            >
          </li>
          <li>
            <p>570</p>
            <span
              >тысяч чел. посетили мероприятия, организованные через наш
              сервис</span
            >
          </li>
        </ul>
      </div>
    </section>
    <section class="working">
      <div class="container">
        <h4>С кем мы работаем</h4>
        <ul>
          <li>
            <p>Лофты</p>
            <span
              >Классические лофты и креативные площадки на территориях бывших
              заводов.</span
            >
          </li>
          <li>
            <p>Рестораны</p>
            <span
              >Если вы сдаете ресторан целиком или отдельную комнату, то вам к
              нам.
            </span>
          </li>
          <li>
            <p>Бары</p>
            <span
              >Если вы сдаёте бар под закрытие, тогда смело размещайте его у
              нас.</span
            >
          </li>
          <li>
            <p>Банкетные залы</p>
            <span
              >Если располагаете залом для проведения торжеств или конференций —
              мы найдём для вас клиентов.
            </span>
          </li>
          <li>
            <p>Фото-студии</p>
            <span
              >Если специализируетесь на фото и видео — вас найдут фотографы,
              операторы, блогеры и люди, заинтересованные в фото-студиях для
              своих праздников.
            </span>
          </li>
          <li>
            <p>Бизнес-площадки</p>
            <span
              >Если вы проводите деловые мероприятия, то мы приведём клиентов на
              вашу площадку.
            </span>
          </li>
          <li>
            <p>Спортивные площадки</p>
            <span
              >Если вы сдаете любую спортивную площадку в почасовую аренду, мы
              будем рады работать с вами.
            </span>
          </li>
        </ul>
        <Buttons button-name="К размещению" />
      </div>
    </section>
    <section class="reivews">
      <div class="container">
        <h4>Что думают наши клиенты</h4>
        <ul>
          <li>
            <div>
              <p>
                Работаем с «Bash Today» с 2015 года. Сервис помогает держать
                стабильный поток заявок и масштабироваться: спустя два года
                после размещения открыли ещё два лофта и продолжаем расти. Кроме
                дополнительного притока клиентов, сервис способствует
                колоссальному росту узнаваемости наших площадок. Спасибо «Bash
                Today» за продуктивную и приятную совместную работу!
              </p>
              <span>Алёна Маловичко,</span>
              <span>владелец «Space & Place»</span>
            </div>
            <div>
              <img src="@/assets/img/reviews.png" alt="" />
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Buttons from "~/components/Uikit/Buttons/Buttons.vue";
import Logo from "~/components/Uikit/Visuals/Logo.vue";
import IconFile from "~/components/icons/IconFile.vue";
import IconArrowUp from "~/components/icons/IconArrowUp.vue";
import IconPercent from "~/components/icons/IconPercent.vue";
import IconVerticalFreeLine from "~/components/icons/IconVerticalFreeLine.vue";
</script>

<style scoped></style>
