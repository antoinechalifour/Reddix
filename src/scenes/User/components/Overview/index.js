import React from 'react'
import moment from 'moment'
import TimelineGroup from './components/TimelineGroup'

const Overview = ({ username, data = [] }) => {
  const groupByDate = data.reduce((group, post) => {
    const created = moment(post.created_utc * 1000)
    const date = created.format('DD/MM/YYYY')

    group[date] = group[date] || []

    group[date].push(post)

    return group
  }, {})

  console.log(groupByDate)

  return (
    <div>
      {Object.keys(groupByDate).map(date => (
        <TimelineGroup
          key={date}
          date={date}
          posts={groupByDate[date]}
          username={username}
        />
      ))}
    </div>
  )
}

export default Overview
