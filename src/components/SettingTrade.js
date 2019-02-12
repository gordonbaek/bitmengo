class TradingWelcome extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h5" gutterBottom>
          Welcome to ADOS!
        </Typography>
        <Divider/>
        <div className={classes.heading}>
        <Typography component="p">
        This is a preview of our  trading dashboard. The markett data to the side is live.<br/>
        </Typography>
        <Typography component="p">
        Want to get started?
        <Typography component={Link} to='/register' className={classes.link}> 
        Create an account in just a few seconds.
        </Typography>
        </Typography>
       
        </div>
        
        <Button fullWidth variant="contained" color="primary" component={Link} to="/login">Log In</Button>
        <Button fullWidth variant="contained" color="secondary" component={Link} to="/register">Register</Button>
      </div>
    );
  }
}