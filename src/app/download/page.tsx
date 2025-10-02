'use client'

import { useEffect, useState } from 'react'
import PlatformDownload from './componets/PlatformDownload'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function Download () {
  const [platform, setPlatform] = useState<string | null>(null)
  const [latestVersion, setLatestVersion] = useState<null | string>()
  const [latestLauncherVersion, setLatestLauncherVersion] = useState<
    null | string
  >()
  const [latestCheckFailed, setLatestCheckFailed] = useState<boolean>()

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const gameRes = await axios.get(
          'https://berrydashlite.lncvrt.xyz/database/getLatestVersion.php',
          {
            responseType: 'text'
          }
        )
        const launcherRes = await axios.get(
          'https://berrydash.lncvrt.xyz/database/launcher/latest.php',
          {
            responseType: 'text'
          }
        )
        setLatestVersion((gameRes.data as string).trim())
        setLatestLauncherVersion((launcherRes.data as string).trim())
      } catch {
        setLatestCheckFailed(true)
      }
    }
    fetchVersions()
  }, [])

  return (
    <div className='content-box text-center'>
      <div className='relative'>
        <Link href='/' className='absolute top-0 left-0 -mt-7 -ml-7'>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className='back-button text-white hover:text-gray-300 transition-colors'
          />
        </Link>
      </div>
      <p className='text-2xl'>Berry Dash Lite Downloads</p>
      {latestVersion == null || latestLauncherVersion == null ? (
        latestCheckFailed ? (
          <>
            <p>Failed to load</p>
            <button onClick={() => window.location.reload()}>
              Reload page
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <>
          <p>what platform do you use?</p>
          <PlatformDownload onSelect={setPlatform} />
          {platform != null ? (
            <>
              <p className='m-4'>
                here are the downloads that are available for your platform
              </p>
              <div className='flex gap-2 justify-center'>
                {platform == 'Windows' ? (
                  <Link
                    className='download-option button'
                    href={`https://archive.org/download/berry-dash-archive/Berry-Dash-Launcher-${latestLauncherVersion}-win-x64.msi`}
                    target='_blank'
                  >
                    Windows (x64)
                  </Link>
                ) : platform == 'macOS' ? (
                  <>
                    <Link
                      className='download-option button'
                      href={`https://archive.org/download/berry-dash-archive/Berry-Dash-Launcher-${latestLauncherVersion}-macos-silicon.dmg`}
                      target='_blank'
                    >
                      macOS (apple silicon based macs)
                    </Link>
                    <Link
                      className='download-option button'
                      href={`https://archive.org/download/berry-dash-archive/Berry-Dash-Launcher-${latestLauncherVersion}-macos-intel.dmg`}
                      target='_blank'
                    >
                      macOS (intel based macs)
                    </Link>
                  </>
                ) : platform == 'Linux' ? (
                  <>
                    <Link
                      className='download-option button'
                      href={`https://archive.org/download/berry-dash-archive/Berry-Dash-Launcher-${latestLauncherVersion}-linux.AppImage`}
                      target='_blank'
                    >
                      Linux AppImage (universal)
                    </Link>
                    <Link
                      className='download-option button'
                      href={`https://archive.org/download/berry-dash-archive/Berry-Dash-Launcher-${latestLauncherVersion}-linux.deb`}
                      target='_blank'
                    >
                      Linux DEB (debian based systems)
                    </Link>
                    <Link
                      className='download-option button'
                      href={`https://archive.org/download/berry-dash-archive/Berry-Dash-Launcher-${latestLauncherVersion}-linux.rpm`}
                      target='_blank'
                    >
                      Linux RPM (REHL based systems)
                    </Link>
                    <Link
                      className='download-option button'
                      href='https://aur.archlinux.org/packages/berrydash'
                      target='_blank'
                    >
                      Arch Linux AUR Package
                    </Link>
                  </>
                ) : platform == 'iOS' ? (
                  <Link
                    className='download-option button'
                    href={`https://archive.org/download/berry-dash-archive/Berry-Dash-Lite-${latestVersion}-ios.ipa`}
                    target='_blank'
                  >
                    iOS
                  </Link>
                ) : platform == 'Android' ? (
                  <Link
                    className='download-option button'
                    href={`https://archive.org/download/berry-dash-archive/Berry-Dash-Lite-${latestVersion}-android.apk`}
                    target='_blank'
                  >
                    Android (arm32, arm64)
                  </Link>
                ) : null}
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  )
}
