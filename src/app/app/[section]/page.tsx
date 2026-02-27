import { FolderKanban } from 'lucide-react'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'

interface SectionPageProps {
  params: Promise<{
    section: string
  }>
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params

  const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{sectionTitle}</h1>
        <p className="text-muted-foreground">
          Manage your {section} efficiently
        </p>
      </div>

      <EmptyState
        icon={FolderKanban}
        title={`No ${section} yet`}
        description={`Get started by creating your first ${section.slice(0, -1)}. This is a placeholder for Phase 2 implementation.`}
        action={
          <Button>
            Create {section.charAt(0).toUpperCase() + section.slice(1, -1)}
          </Button>
        }
      />
    </div>
  )
}
