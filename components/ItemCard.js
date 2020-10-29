import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  itemRoot: {
  },
  itemHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '40px',
    paddingBottom: '10px'
  },
  itemHeaderText: {
    fontWeight: 'bold',
    color: '#6700be'
  },
  itemButtonMore: {
    display: 'flex',
    alignItems: 'center'
  },
  itemInfoSplit: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  itemInfoEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  itemType: {
    color: '#f58a0b',
    paddingBottom: '10px'
  }
}))

export default function ItemCard(props) {
  const classes = useStyles()

  function ItemHeader(doc, type) {
    return (
      <>
        <div className={classes.itemHeader}>
          <Typography className={classes.itemHeaderText} variant="h6" component="h2">
            {type === 'Organization' ? doc.orgName : doc.name}
          </Typography>
        </div>
        <Typography className={classes.itemType} variant="subtitle2">
          {doc.lisa}
        </Typography>
      </>
    )
  }

  function buildEventItem(doc) {
    return (
      <>
        {ItemHeader(doc)}
        <Typography variant="body1">
          {doc.description}
        </Typography>
        <div className={classes.itemInfoEnd}>
          <Link variant="body2" color={doc.hasOwnProperty('website') ? 'initial' : 'error'} href={doc.website}>
            Website
          </Link>
        </div>
      </>
    )
  }

  function buildOrganizationItem(doc) {
    return (
      <>
        {ItemHeader(doc, doc['@type'])}
        <Typography variant="body1">
          {doc.description}
        </Typography>
        <Typography className={classes.itemInfoEnd} variant="subtitle2">
          <Link variant="body2" color={doc.hasOwnProperty('website') ? 'initial' : 'error'} href={doc.website}>
            Website
          </Link>
        </Typography>
      </>
    )
  }

  function buildProductItem(doc) {
    return (
      <>
        {ItemHeader(doc)}
        <Typography variant="body1">
          {doc.description}
        </Typography>
        <Typography className={classes.itemInfoEnd} variant="subtitle2">
          <Link variant="body2" color={doc.hasOwnProperty('url') ? 'initial' : 'error'} href={doc.url}>
            Website
          </Link>
        </Typography>
      </>
    )
  }

  function buildPublicationItem(doc) {
    return (
      <>
        {ItemHeader(doc)}

        <Typography variant="body1">
          {doc.description}
        </Typography>

        <div className={classes.itemInfoEnd}>
          {doc.publicationType !== 'to be determined'
            && (
              <Link variant="body2" color={doc.hasOwnProperty('url') ? 'initial' : 'error'} href={doc.url}>
                {doc.publicationType}
              </Link>
            )
            || (
              <Typography variant="subtitle2">
                <Link variant="body2" color={doc.hasOwnProperty('url') ? 'initial' : 'error'} href={doc.url}>
                  Website
                </Link>
              </Typography>
            )}
        </div>

      </>
    )
  }

  function buildWorkingGroupItem(doc) {
    return (
      <>
        {ItemHeader(doc)}
        <Typography variant="body1">
          {doc.description}
        </Typography>
        <Typography className={classes.itemInfoEnd} variant="subtitle2">
          <Link variant="body2" color={doc.hasOwnProperty('url') ? 'initial' : 'error'} href={doc.url}>
            {doc.category}
          </Link>
        </Typography>
      </>
    )
  }

  const { doc } = props

  let item = {}

  switch (doc['@type']) {
    case 'Event':
      item = buildEventItem(doc)
      break
    case 'Organization':
      item = buildOrganizationItem(doc)
      break
    case 'Product':
      item = buildProductItem(doc)
      break
    case 'Publication':
      item = buildPublicationItem(doc)
      break
    case 'WorkingGroup':
      item = buildWorkingGroupItem(doc)
      break
  }

  return (
    <div className={classes.itemRoot}>
      {item}
    </div>
  )
}

ItemCard.propTypes = {
  doc: PropTypes.object
}
