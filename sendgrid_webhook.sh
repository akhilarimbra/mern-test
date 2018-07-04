function localtunnel {
  lt -s testingemailyakhilarimbra --port 3001
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done

