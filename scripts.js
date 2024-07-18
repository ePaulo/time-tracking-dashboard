// DOM References
const dailyBtn = document.getElementById('daily-btn')
const weeklyBtn = document.getElementById('weekly-btn')
const monthlyBtn = document.getElementById('monthly-btn')
const trackingContent = document.getElementById('tracking-content')

// Event listeners
dailyBtn.addEventListener('click', () => {
  setSelectedBtn(dailyBtn)
  displayTrackingData(trackingData, 'daily')
})

weeklyBtn.addEventListener('click', () => {
  setSelectedBtn(weeklyBtn)
  displayTrackingData(trackingData, 'weekly')
})

monthlyBtn.addEventListener('click', () => {
  setSelectedBtn(monthlyBtn)
  displayTrackingData(trackingData, 'monthly')
})

// Global variable(s)
let trackingData = [
  {
    title: 'Work',
    timeframes: {
      daily: {
        current: 5,
        previous: 7,
      },
      weekly: {
        current: 32,
        previous: 36,
      },
      monthly: {
        current: 103,
        previous: 128,
      },
    },
  },
  {
    title: 'Play',
    timeframes: {
      daily: {
        current: 1,
        previous: 2,
      },
      weekly: {
        current: 10,
        previous: 8,
      },
      monthly: {
        current: 23,
        previous: 29,
      },
    },
  },
]

// Initial display
displayTrackingData(trackingData, 'weekly')

// functions
function setSelectedBtn(timeframeBtn) {
  const timeframeBtns = [dailyBtn, weeklyBtn, monthlyBtn]
  timeframeBtns.forEach(btn => {
    btn.classList.remove('selected-btn')
  })
  timeframeBtn.classList.add('selected-btn')
}

function displayTrackingData(trackingData, timeframe) {
  if (!trackingData) return

  const abbrHours = hours => (hours < 1 ? '' : hours > 1 ? 'hrs' : 'hr')

  const prefixPreviousTime = timeframe => {
    switch (timeframe) {
      case 'daily':
        return 'Yesterday'
      case 'weekly':
        return 'Last Week'
      case 'monthly':
        return 'Last Month'
      default:
        return ''
    }
  }

  const idTitle = title => {
    return title.toLowerCase().trim().replace(' ', '-')
  }

  const displayContent = trackingData
    .map(dataSet => {
      const { title, timeframes } = dataSet
      const { current, previous } = timeframes[timeframe]

      const cardTitle = `
        <div class="card-intro">
          <h2 class="card-title">${title}</h2>
          <img class="ellipsis-icon" src="images/icon-ellipsis.svg" alt="ellipsis" />
        </div>
      `

      const currentTimeframe = `
        <div class="current-timeframe">
          <p class=${timeframe}>${current}${abbrHours(current)}</p>
        </div>
      `

      const previousTimeframe = `
        <div class="previous-timeframe">
          <p class=${timeframe}>
            ${prefixPreviousTime(timeframe)} - ${previous}${abbrHours(previous)}
          </p>
        </div>
      `

      return `
              <section class="tracking-card" id=${idTitle(title)}>
                <div class="card-content">
                  ${cardTitle}
                  <div class="timeframes">
                    ${currentTimeframe}
                    ${previousTimeframe}
                  </div>
                </div>
              </section>
          `
    })
    .join('')

  trackingContent.innerHTML = displayContent
}
