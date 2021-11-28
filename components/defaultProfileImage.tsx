import '../public/default-profile.svg'
import clsx from 'clsx'

export const getImage = (image: string) => {
    const classes = clsx('rounded-full', 'w-10', 'h-10')
    if (!image) {
        return (
            <img
                className={classes}
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAyMmMtMy4xMjMgMC01LjkxNC0xLjQ0MS03Ljc0OS0zLjY5LjI1OS0uNTg4Ljc4My0uOTk1IDEuODY3LTEuMjQ2IDIuMjQ0LS41MTggNC40NTktLjk4MSAzLjM5My0yLjk0NS0zLjE1NS01LjgyLS44OTktOS4xMTkgMi40ODktOS4xMTkgMy4zMjIgMCA1LjYzNCAzLjE3NyAyLjQ4OSA5LjExOS0xLjAzNSAxLjk1MiAxLjEgMi40MTYgMy4zOTMgMi45NDUgMS4wODIuMjUgMS42MS42NTUgMS44NzEgMS4yNDEtMS44MzYgMi4yNTMtNC42MjggMy42OTUtNy43NTMgMy42OTV6Ii8+PC9zdmc+"
            ></img>
        )
    }
    return <img className={classes} src={image} alt="Profile Image" />
}
