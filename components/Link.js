/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'

const CustomLink = ({ href, ...rest }) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink || isAnchorLink) {
    return (
      <Link href={href}>
        <a {...rest}></a>
      </Link>
    )
  }

  return (
    <Link href={href}>
      <a target="_blank" rel="noopener noreferrer" {...rest}></a>
    </Link>
  )
}

export default CustomLink
