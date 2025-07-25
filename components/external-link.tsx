import Link, { LinkProps } from "next/link"
import React from "react"

interface ExternalLinkProps extends React.PropsWithChildren<LinkProps> {
  href: string
  className?: string
  ariaLabel?: string
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children, className, ariaLabel, ...props }) => {
  const isExternal = href.startsWith("http")
  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </Link>
  )
}

export default ExternalLink 