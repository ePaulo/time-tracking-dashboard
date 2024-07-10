// DOM References for time-tracking cards and timeframe buttons
const dailyBtn = document.getElementById('daily-btn')
const weeklyBtn = document.getElementById('weekly-btn')
const monthlyBtn = document.getElementById('monthly-btn')
const trackingContent = document.getElementById('tracking-content')

// Event listeners on timeframe buttons
dailyBtn.addEventListener('click', () =>
  displayTrackingData(trackingData, 'daily')
)
weeklyBtn.addEventListener('click', () =>
  displayTrackingData(trackingData, 'weekly')
)
monthlyBtn.addEventListener('click', () =>
  displayTrackingData(trackingData, 'monthly')
)

// Global variable for time-tracking data
let trackingData

// Fetch time-tracking data and display weekly stats by default
fetch('data.json')
  .then(resp => resp.json())
  .then(data => {
    trackingData = data
    displayTrackingData(trackingData, 'weekly')
  })
  .catch(errMsg => console.error(errMsg))

// Function to display time-tracking data for the selected time
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

  const displayContent = trackingData
    .map(dataSet => {
      const { title, timeframes } = dataSet
      const { current, previous } = timeframes[timeframe]

      const cardTitle = `
        <header class="card-intro">
          <h2 class="card-title">${title}</h2>
          <a class="more-info" href="#">...</a>
        </header>
      `

      const currentTimeframe = `
        <div class="current-timeframes">
          <p class=${timeframe}>${current}${abbrHours(current)}</p>
        </div>
      `

      const previousTimeframe = `
        <footer class="previous-timeframes">
          <p class=${timeframe}>
            ${prefixPreviousTime(timeframe)} - ${previous}${abbrHours(previous)}
          </p>
        </footer>
      `

      return `
              <section class="report-card" id=${title}>
                ${cardTitle}
                ${currentTimeframe}
                ${previousTimeframe}
              </section>
          `
    })
    .join('')

  trackingContent.innerHTML = displayContent
}
