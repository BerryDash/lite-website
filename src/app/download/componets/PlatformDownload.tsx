'use client'

import { useEffect, useRef, useState } from 'react'
import './PlatformDownload.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import {
  faAndroid,
  faApple,
  faLinux,
  faWindows
} from '@fortawesome/free-brands-svg-icons'

export default function PlatformDownload ({
  onSelect
}: {
  onSelect: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [])

  const handleClick = (v: string) => {
    setSelected(v)
    setOpen(false)
    onSelect(v)
  }

  return (
    <div className='dropdown' ref={ref}>
      <button onClick={() => setOpen(!open)} className='dropdown-btn'>
        <span>{selected ?? 'Select'}</span>
        <FontAwesomeIcon
          icon={faChevronUp}
          className={`arrow ${open ? 'rotate' : ''}`}
        />
      </button>
      <div className={`dropdown-list ${open ? 'open' : ''}`}>
        <div onClick={() => handleClick('Windows')} className='dropdown-item'>
          <FontAwesomeIcon icon={faWindows} />
          Windows
        </div>
        <div onClick={() => handleClick('macOS')} className='dropdown-item'>
          <FontAwesomeIcon icon={faApple} />
          macOS
        </div>
        <div onClick={() => handleClick('Linux')} className='dropdown-item'>
          <FontAwesomeIcon icon={faLinux} />
          Linux
        </div>
        <div onClick={() => handleClick('iOS')} className='dropdown-item'>
          <FontAwesomeIcon icon={faApple} />
          iOS
        </div>
        <div onClick={() => handleClick('Android')} className='dropdown-item'>
          <FontAwesomeIcon icon={faAndroid} />
          Android
        </div>
      </div>
    </div>
  )
}
