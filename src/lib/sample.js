export const sampleTOML = `# This is a TOML document.

title = "ImpalaPay Co."

[owner]
name = "Impala Co."
establishment=""

[database]
server = "192.168.1.1"
ports = [ 8000, 8001, 8002 ]
connection_max = 5000
enabled = true

[servers]

	# Indentation (tabs and/or spaces) is allowed but not required
	[servers.alpha]
	ip = "10.0.0.1"
	dc = "eqdc10"

	[servers.beta]
	ip = "10.0.0.2"
	dc = "eqdc10"

[clients]
data = [ ["gamma", "delta"], [1, 2] ]

# Line breaks are OK when inside arrays
hosts = [
	"alpha",
	"omega"
]`;
