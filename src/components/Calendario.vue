<template>
  <v-container>
    <v-row justify="space-around">
      <v-col>
        <div class="calendar-flex">
          <div class="titulos-form">Fecha</div>
          <div class="calendar">
            <div class="calendar-info">
              <span class="calendar-prev" id="prev-month">{{ iconPrev }}</span>
              <div class="calendar-month" id="month"></div>
              <div class="calendar-year" id="year"></div>
              <span class="calendar_next" id="next-month">{{ iconNext }}</span>
            </div>
            <div class="calendar-week">
              <div class="calendar-day-week" id="day-week">{{ dias[0] }}</div>
              <div class="calendar-day-week" id="day-week">{{ dias[1] }}</div>
              <div class="calendar-day-week" id="day-week">{{ dias[2] }}</div>
              <div class="calendar-day-week" id="day-week">{{ dias[3] }}</div>
              <div class="calendar-day-week" id="day-week">{{ dias[4] }}</div>
              <div class="calendar-day-week" id="day-week">{{ dias[5] }}</div>
              <div class="calendar-day-week" id="day-week">{{ dias[6] }}</div>
            </div>
            <div class="calendar-dates" id="dates"></div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "FormReserva",

  data: () => ({
    iconPrev: "◀",
    iconNext: "▶",
    dias: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
  }),

  mounted: function () {
    let monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    let currentDate = new Date();
    let currentDay = currentDate.getDay();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    let dates = document.getElementById("dates");
    let month = document.getElementById("month");
    let year = document.getElementById("year");
    let prev = document.getElementById("prev-month");
    let next = document.getElementById("next-month");

    let selDate = 0;

    month.innerHTML = monthNames[currentMonth];
    year.innerHTML = currentYear;

    prev.addEventListener("click", () => {
      lastMonth();
    });

    next.addEventListener("click", () => {
      nextMonth();
    });

    writeMonth(currentMonth);

    function clickDate() {
      let dateBtn = document.getElementsByClassName("date-btn");
      for (let a of dateBtn) {
        a.addEventListener("click", () => {
          selDate = a.textContent;

          if (document.querySelector(".day-active") != null) {
            let dateActive = document.querySelector(".day-active");
            if (!(dateActive.textContent === selDate)) {
              a.classList.add("day-active");
              a.setAttribute("data-name", selDate);
              a.setAttribute("data-month", currentMonth);
              a.setAttribute("data-year", currentYear);
              dateActive.classList.remove("day-active");
            }
          } else {
            a.classList.add("day-active");
            a.setAttribute("data-name", selDate);
            a.setAttribute("data-month", currentMonth);
            a.setAttribute("data-year", currentYear);
          }
          console.log(selDate);
        });
      }
    }

    function writeMonth(currentMonth) {
      for (let i = startDay(); i > 0; i--) {
        dates.innerHTML += `<div class="day-last date-btn">${
          getTotalDays(currentMonth - 1) - (i - 1)
        }
            </div>`;
      }

      for (let i = 1; i <= getTotalDays(currentMonth); i++) {
        if (i === currentDate.getDate()) {
          dates.innerHTML += ` <div class="day-active date-btn" data-name="${i}" data-month="${currentMonth}" data-year="${currentYear}">${i}</div>`;
        } else {
          dates.innerHTML += ` <div class="date-btn">${i}</div>`;
        }
      }
      clickDate();
    }

    function getTotalDays(currentMonth) {
      if (currentMonth === -1) currentMonth * 11;

      if (
        currentMonth == 0 ||
        currentMonth == 2 ||
        currentMonth == 4 ||
        currentMonth == 6 ||
        currentMonth == 7 ||
        currentMonth == 9 ||
        currentMonth == 11
      ) {
        return 31;
      } else if (
        currentMonth == 3 ||
        currentMonth == 5 ||
        currentMonth == 8 ||
        currentMonth == 10
      ) {
        return 30;
      } else {
        return isLeag() ? 29 : 28;
      }
    }

    function isLeag() {
      return (year % 100 !== 0 && year % 4 === 0) || year % 400 === 0;
    }

    function startDay() {
      let start = new Date(currentYear, currentMonth, 1);
      return start.getDay() - 1 === -1 ? 6 : start.getDay() - 1;
    }

    function lastMonth() {
      if (currentMonth !== 0) {
        currentMonth--;
      } else {
        currentMonth = 11;
        currentYear--;
      }
      console.log(currentMonth);
      setNewDate();
    }

    function nextMonth() {
      if (currentMonth !== 11) {
        currentMonth++;
      } else {
        currentMonth = 0;
        currentYear++;
      }
      console.log(currentMonth);
      setNewDate();
    }

    function setNewDate() {
      currentDate.setFullYear(currentYear, month, currentDay);
      month.textContent = monthNames[currentMonth];
      year.textContent = currentYear;

      dates.innerHTML = "";
      writeMonth(currentMonth);
    }
  },
};
</script>


<style scope>
:root {
  --color-ppal: #ec1e6d;
  --color-secu: #3dcfec;

  --color-texto-ppal: #2c2c2c;
  --color-texto-secu: #5c4d7d;
  --color-texto-terc: #4e4e4e;

  --color-fondo: #ffffff;
  --color-texto-btn: #fafafa;

  --border-radius: 0.4em;

  --shadow: 0px 10px 30px rgba(27, 27, 27, 0.068);

  color: var(--color-texto-ppal);
}

/* CALENDARIO */
.calendar-flex {
  display: flex;
  flex-direction: column;
}

.calendar {
  background-color: var(--color-fondo);
  padding: 0.6em;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  margin-top: 0.2em;
}

.calendar-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
}

.calendar-day-week {
  font-weight: lighter;
}

.calendar-week {
  margin-bottom: 0.8em;
}

.calendar-week,
.calendar-dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 0.6em;
  text-align: center;
  font-size: 0.8em;
}

.date-btn {
  padding: 0.4em;
}

.day-active {
  background-color: var(--color-secu);
  border-radius: 1em;
  color: var(--color-fondo);
}

.day-last {
  color: gray;
}
</style>