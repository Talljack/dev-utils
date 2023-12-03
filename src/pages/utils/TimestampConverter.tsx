import Select from '@/components/common/Select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import dayjs from 'dayjs'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

const TimestampConverter: FC = () => {
  // timestamp to time
  const [timestampType, setTimestampType] = useState('milliseconds')
  const [timestamp, setTimestamp] = useState(+new Date())
  const [time, setTime] = useState('')

  useEffect(() => {
    const date = new Date(
      timestampType === 'seconds' ? timestamp * 1000 : timestamp
    )
    setTime(date.toLocaleString())
  }, [timestamp, timestampType])

  // time to timestamp
  const [inputTime, setInputTime] = useState({
    startDate: new Date(),
    endDate: new Date()
  })
  const [timeTimestamp, setTimeTimestamp] = useState(0)

  useEffect(() => {
    if (!inputTime) {
      setTimeTimestamp(0)
      return
    }
    const timestamp = dayjs(inputTime.startDate).unix() * 1000
    setTimeTimestamp(timestamp)
  }, [inputTime])
  // timestamp differ to time differ
  const [inputTimestampDiffer, setInputTimestampDiffer] = useState(4340508)
  const [timeDiffer, setTimeDiffer] = useState('')
  useEffect(() => {
    const days = Math.floor(inputTimestampDiffer / (24 * 3600 * 1000))
    const hours = Math.floor(
      (inputTimestampDiffer % (24 * 3600 * 1000)) / (3600 * 1000)
    )
    const minutes = Math.floor(
      (inputTimestampDiffer % (3600 * 1000)) / (60 * 1000)
    )
    const seconds = Math.floor((inputTimestampDiffer % (60 * 1000)) / 1000)
    if (days) {
      setTimeDiffer(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    } else if (hours) {
      setTimeDiffer(`${hours}h ${minutes}m ${seconds}s`)
    } else if (minutes) {
      setTimeDiffer(`${minutes}m ${seconds}s`)
    } else {
      setTimeDiffer(`${seconds}s`)
    }
  }, [inputTimestampDiffer])
  // time differ to timestamp differ
  const [dateTime, setDateTime] = useState({
    startDate: new Date(),
    endDate: dayjs().add(1, 'day').toDate()
  })
  const [dateTimestampDiffer, setDateTimestampDiffer] = useState(0)
  useEffect(() => {
    const timestampDiffer = dayjs(dateTime.endDate).diff(
      dayjs(dateTime.startDate),
      'millisecond'
    )
    setDateTimestampDiffer(timestampDiffer)
  }, [dateTime])
  return (
    <div className="mt-4 flex h-full flex-col gap-8">
      <div className="timestamp-to-time group flex w-full flex-col">
        <h1 className="text-2xl font-bold">Timestamp to Time</h1>
        <div className="mt-4 flex gap-4">
          <div className="flex flex-1 flex-col gap-2 ">
            <Label className="font-bold">Unix Timestamp</Label>
            <div className="flex flex-1 items-center gap-2">
              <Input
                value={timestamp}
                onChange={e => setTimestamp(Number(e.target.value))}
                className="flex-1 rounded-md border border-gray-300 p-2"
              />
              <Select
                options={[
                  { label: 'Seconds', value: 'seconds' },
                  { label: 'Milliseconds', value: 'milliseconds' }
                ]}
                className="w-[150px]"
                value={timestampType}
                onChange={value => {
                  // generate timestamp
                  if (value === 'seconds' && timestamp) {
                    setTimestamp(timestamp / 1000)
                  }
                  if (value === 'milliseconds' && timestamp) {
                    setTimestamp(timestamp * 1000)
                  }
                  setTimestampType(value)
                }}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Label className="font-bold">Time</Label>
            <Input
              value={time}
              readOnly
              className="rounded-md border border-gray-300 p-2"
            />
          </div>
        </div>
      </div>
      <div className="time-to-timestamp group flex w-full flex-col">
        <h1 className="text-2xl font-bold">Date To Timestamp</h1>
        <div className="mt-4 flex gap-4">
          <div className="flex flex-1 flex-col gap-2 ">
            <Label className="font-bold">Date</Label>
            <Datepicker
              asSingle={true}
              value={inputTime}
              onChange={newValue =>
                setInputTime(newValue as { startDate: Date; endDate: Date })
              }
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Label className="font-bold">Unix Timestamp(Milliseconds)</Label>
            <Input
              value={timeTimestamp}
              readOnly
              className="rounded-md border border-gray-300 p-2"
            />
          </div>
        </div>
      </div>
      <div className="timestamp-differ-to-time-differ group flex w-full flex-col">
        <h1 className="text-2xl font-bold">Timestamp Differ To Time Differ</h1>
        <div className="mt-4 flex gap-4">
          <div className="flex flex-1 flex-col gap-2 ">
            <Label className="font-bold">Timestamp Differ(Milliseconds)</Label>
            <div className="flex flex-1 items-center gap-2">
              <Input
                value={inputTimestampDiffer}
                onChange={e => setInputTimestampDiffer(Number(e.target.value))}
                className="flex-1 rounded-md border border-gray-300 p-2"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Label className="font-bold">Time Differ</Label>
            <Input
              value={timeDiffer}
              readOnly
              className="rounded-md border border-gray-300 p-2"
            />
          </div>
        </div>
      </div>
      <div className="timestamp-differ group flex w-full flex-col">
        <h1 className="text-2xl font-bold">Date Range To Timestamp</h1>
        <div className="mt-4 flex gap-4">
          <div className="flex flex-1 gap-2 ">
            <div className="start-time flex-1">
              <Label className="font-bold">Date Range</Label>
              <Datepicker
                value={dateTime}
                onChange={newValue =>
                  setDateTime(newValue as { startDate: Date; endDate: Date })
                }
                showShortcuts={true}
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <Label className="font-bold">Timestamp(Milliseconds)</Label>
              <Input
                value={dateTimestampDiffer}
                readOnly
                className="rounded-md border border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimestampConverter
