import { Card, CardContent } from "@/components/ui/card"
import { Bell, Calendar, Trophy, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'HACKATHON',
      title: 'Registration Confirmed!',
      message: 'Your team "Byte Me" has been confirmed for Winter CodeFest 2024.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      type: 'SPORTS',
      title: 'Match Schedule Updated',
      message: 'The basketball finals have been rescheduled to tomorrow at 5 PM.',
      time: '1 day ago',
      unread: true,
    },
    {
      id: 3,
      type: 'CULTURAL',
      title: 'Duty Assignment',
      message: 'You have been assigned as Stage Coordinator for the Annual Fest.',
      time: '2 days ago',
      unread: false,
    }
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case 'HACKATHON': return <AlertCircle className="w-5 h-5 text-accent-hackathons" />
      case 'SPORTS': return <Trophy className="w-5 h-5 text-accent-sports" />
      case 'CULTURAL': return <Calendar className="w-5 h-5 text-accent-cultural" />
      default: return <Bell className="w-5 h-5 text-muted" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Notifications</h1>
          <p className="text-muted mt-2">Stay updated with your campus activities.</p>
        </div>
        <Badge variant="secondary">{notifications.filter(n => n.unread).length} Unread</Badge>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <Card key={notif.id} className={`transition-colors ${notif.unread ? 'bg-surface border-brand/50' : 'bg-surface-alt/50 border-transparent'}`}>
            <CardContent className="p-4 flex gap-4">
              <div className="mt-1">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-bold ${notif.unread ? 'text-ink' : 'text-ink/80'}`}>{notif.title}</h3>
                  <span className="text-xs text-muted whitespace-nowrap">{notif.time}</span>
                </div>
                <p className={`text-sm mt-1 ${notif.unread ? 'text-ink/90' : 'text-muted'}`}>{notif.message}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
