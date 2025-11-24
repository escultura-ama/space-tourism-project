'use client'

import { useState, useMemo } from 'react'
import { launches } from '../../data/launches'
import { launchpads } from '../../data/launchpads'
import Image from 'next/image'

// Small helper component that falls back to a provided placeholder when the
// original `src` is missing or fails to load. Uses local state because
// Next/Image doesn't allow swapping `e.currentTarget.src` like a plain <img>.
function PatchImage({ src, alt, width = 64, height = 64, className }: any) {
  const [errored, setErrored] = useState(false)
  const fallback = 'http://i.imgur.com/RJjhalG.png'
  const displaySrc = !src || errored ? fallback : src

  return (
    <Image
      width={width}
      height={height}
      src={displaySrc}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  )
}


function ordinal(n: number) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}

function formatLaunchDate(iso?: string) {
  if (!iso) return 'Unknown date'
  const d = new Date(iso)
  const day = d.getDate()
  const dayWithSuffix = `${day}${ordinal(day)}`
  const month = d.toLocaleString(undefined, { month: 'short' })
  const year = d.getFullYear()
  const time = d.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  return `${dayWithSuffix} ${month} ${year} at ${time}`
}

function Discover() {
  const [keywords, setKeywords] = useState('')
  const [padFilter, setPadFilter] = useState('')
  const [maxYear, setMaxYear] = useState('')
  const [minYear, setMinYear] = useState('')

  const filteredLaunches = useMemo(() => {
    return launches.filter((launch) => {
      const launchYear = launch.launch_date_local
        ? new Date(launch.launch_date_local).getFullYear()
        : null

      if (keywords) {
        const kw = keywords.toLowerCase()
        const rocketName = launch.rocket?.rocket_name?.toLowerCase() ?? ''
        const payloads =
          launch.payloads?.map((p: any) => p.payload_id.toLowerCase()).join(' ') ?? ''
        if (!rocketName.includes(kw) && !payloads.includes(kw)) return false
      }

      if (padFilter && launch.launch_site?.site_id !== padFilter) return false

      if (maxYear && launchYear && launchYear > parseInt(maxYear)) return false
      if (minYear && launchYear && launchYear < parseInt(minYear)) return false

      return true
    })
  }, [keywords, padFilter, maxYear, minYear])

  const years = Array.from(
    new Set(
      launches
        .map((l) => (l.launch_date_local ? new Date(l.launch_date_local).getFullYear() : null))
        .filter((year): year is number => year !== null)
    )
  ).sort((a, b) => a - b)

  return (
    <div className="bg-[#0a0e19] min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[200px] sm:h-[300px] lg:h-[65vh] bg-gradient-to-b from-transparent to-[#0a0e19]">
        <Image
          width={1920}
          height={1080}
          src="/images/banner.png"
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0e19]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h4 className="Bellefair uppercase text-xl md:text-3xl lg:text-6xl text-white text-center px-4">
            Discover Space Mission
          </h4>
        </div>
      </div>

      {/* Filter & List Container */}
      <div className="w-full mx-auto md:w-[90%] lg:w-[80%] relative -mt-16 z-10 mb-12">
        {/* Filter Section */}
        <div className="bg-gray-900 p-5 md:px-8 grid grid-cols-2 md:grid-cols-7 gap-2 border-b border-slate-500 items-end">
          <div className="md:col-span-2">
            <label className="text-white w-full block barlow-condensed text-xs md:text-sm uppercase font-bold mb-2">
              Keywords
            </label>
            <input
              type="text"
              className="w-full barlow-condensed appearance-none border rounded-sm py-2 px-3 text-white leading-tight bg-transparent border-gray-300"
              placeholder="eg Falcon"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label className="barlow-condensed text-white text-xs md:text-sm uppercase font-bold mb-2 block">
              Launch Pad
            </label>
            <select
              className="w-full barlow-condensed pl-2 appearance-none border rounded-sm py-3 md:py-2 text-white leading-tight bg-transparent border-gray-300 hover:border-white cursor-pointer text-xs md:text-sm"
              value={padFilter}
              onChange={(e) => setPadFilter(e.target.value)}
            >
              <option value="" className="px-4 py-2 text-sm text-slate-700">
                Any
              </option>
              {launchpads.map((p) => (
                <option key={p.id} value={p.id} className="px-4 py-2 text-sm text-slate-700">
                  {p.full_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="barlow-condensed text-white text-xs md:text-sm uppercase font-bold mb-2 block">
              Max Year
            </label>
            <select
              className="w-full barlow-condensed appearance-none border rounded-sm py-2 px-3 text-white leading-tight bg-transparent border-gray-300 hover:border-white cursor-pointer"
              value={maxYear}
              onChange={(e) => setMaxYear(e.target.value)}
            >
              <option className="px-4 py-2 text-sm text-slate-700" value="">
                Any
              </option>
              {years.map((year) => (
                <option key={year} className="px-4 py-2 text-sm text-slate-700" value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="barlow-condensed text-white text-xs md:text-sm uppercase font-bold mb-2 block">
              Min Year
            </label>
            <select
              className="w-full barlow-condensed appearance-none border rounded-sm py-2 px-3 text-white leading-tight bg-transparent border-gray-300 hover:border-white cursor-pointer"
              value={minYear}
              onChange={(e) => setMinYear(e.target.value)}
            >
              <option className="px-4 py-2 text-sm text-slate-700" value="">
                Any
              </option>
              {years.map((year) => (
                <option key={year} className="px-4 py-2 text-sm text-slate-700" value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2 md:col-span-1 mt-4 md:mt-0">
            <button className="barlow-condensed bg-white p-2 text-center text-black bold w-full rounded-sm hover:bg-gray-200 transition duration-200 ease-in-out">
              Apply
            </button>
          </div>
        </div>

        {/* Missions Meta */}
        <div className="bg-slate-900 text-xs text-center pt-6 pb-3">
          <p className="text-slate-400">
            Showing {filteredLaunches.length} Missions
          </p>
        </div>

        {/* Missions List */}
        <div>
          {filteredLaunches.map((launch) => {
            const patch = launch.links?.mission_patch
            const payloadName =
              launch.payloads && launch.payloads.length
                ? launch.payloads.map((p: any) => p.payload_id).join(', ')
                : 'Unknown'
            const success =
              typeof launch.launch_success === 'boolean' ? launch.launch_success : null

            const statusLabel =
              success === null ? 'Unknown' : success ? 'Successful' : 'Failed Mission'
            const statusColor = success === false ? 'text-red-400' : success ? 'text-green-400' : ''

            const pad = launchpads.find((p) => p.id === launch.launch_site?.site_id)

            return (
              <div
                key={launch.flight_number}
                className="flex p-4 gap-4 border-b border-slate-700 md:py-6 bg-slate-900"
              >
                {/* Patch */}
                <div className="text-left w-[10%]">
                  <PatchImage
                    width={64}
                    height={64}
                    src={patch}
                    alt="mission patch"
                    className="w-16 h-16 object-contain"
                  />

                </div>

                {/* Info */}
                <div className="w-[80%]">
                  <div>
                    <h4 className="barlow text-white">
                      {launch.rocket?.rocket_name} - {payloadName}
                      <span className={`${statusColor} ml-2`}> - {statusLabel}</span>
                    </h4>
                    <p className="barlow mt-2 text-gray-300 text-xs md:text-sm md:w-4/5">
                      Launched on{' '}
                      <time dateTime={launch.launch_date_local}>
                        {formatLaunchDate(launch.launch_date_local)}
                      </time>{' '}
                      from {pad?.full_name ?? launch.launch_site?.site_name ?? 'Unknown'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-x-2 lg:space-x-4 space-y-2 mt-2 md:mt-8 flex flex-wrap">
                    {launch.links?.reddit_campaign ? (
                      <a
                        href={launch.links.reddit_campaign}
                        target="_blank"
                        rel="noreferrer"
                        className="barlow-condensed border p-1 md:px-4 rounded-sm text-sm text-gray-400 border-gray-400 hover:border-white hover:text-white inline-block"
                      >
                        Reddit Campaign
                      </a>
                    ) : null}
                    {launch.links?.reddit_launch ? (
                      <a
                        href={launch.links.reddit_launch}
                        target="_blank"
                        rel="noreferrer"
                        className="barlow-condensed border p-1 md:px-4 rounded-sm text-sm text-gray-400 border-gray-400 hover:border-white hover:text-white inline-block"
                      >
                        Reddit Launch
                      </a>
                    ) : null}
                    {launch.links?.presskit ? (
                      <a
                        href={launch.links.presskit}
                        target="_blank"
                        rel="noreferrer"
                        className="barlow-condensed border p-1 md:px-4 rounded-sm text-sm text-gray-400 border-gray-400 hover:border-white hover:text-white inline-block"
                      >
                        Press kit
                      </a>
                    ) : null}
                    {launch.links?.article_link ? (
                      <a
                        href={launch.links.article_link}
                        target="_blank"
                        rel="noreferrer"
                        className="barlow-condensed border p-1 md:px-4 rounded-sm text-sm text-gray-400 border-gray-400 hover:border-white hover:text-white inline-block"
                      >
                        Article
                      </a>
                    ) : null}
                    {launch.links?.video_link ? (
                      <a
                        href={launch.links.video_link}
                        target="_blank"
                        rel="noreferrer"
                        className="barlow-condensed border p-1 md:px-4 rounded-sm text-sm text-gray-400 border-gray-400 hover:border-white hover:text-white inline-block"
                      >
                        Watch Video
                      </a>
                    ) : null}
                  </div>
                </div>

                {/* Flight Number */}
                <div className="text-center w-[10%]">
                  <h2 className="barlow text-white">{launch.flight_number}</h2>
                  <p className="text-gray-400 barlow-condensed">Flight Number</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Discover